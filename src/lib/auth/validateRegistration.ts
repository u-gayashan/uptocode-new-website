import type {
  FieldErrors,
  RegistrationFormValues,
} from "@/types/auth";

export type ValidateRegistrationResult =
  | { ok: true; values: RegistrationFormValues }
  | { ok: false; message: string; fieldErrors?: FieldErrors };

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

export function validateRegistration(
  input: unknown,
): ValidateRegistrationResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, message: "Invalid request body." };
  }

  const obj = input as Partial<Record<keyof RegistrationFormValues, unknown>>;

  const errors: FieldErrors = {};

  const firstName = obj.firstName;
  const lastName = obj.lastName;
  const username = obj.username;
  const email = obj.email;
  const password = obj.password;

  if (!isNonEmptyString(firstName)) errors.firstName = "First name is required.";
  if (!isNonEmptyString(lastName)) errors.lastName = "Last name is required.";

  if (!isNonEmptyString(username)) {
    errors.username = "Username is required.";
  } else {
    const u = normalizeUsername(username);
    if (u.length < 3 || u.length > 20) {
      errors.username = "Username must be 3-20 characters.";
    } else if (!/^[a-z0-9_]+$/.test(u)) {
      errors.username = "Username can use letters, numbers, and underscore only.";
    }
  }

  if (!isNonEmptyString(email)) {
    errors.email = "Email is required.";
  } else {
    const e = normalizeEmail(email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      errors.email = "Enter a valid email address.";
    }
  }

  if (!isNonEmptyString(password)) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Minimum length is 8 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      fieldErrors: errors,
    };
  }

  return {
    ok: true,
    values: {
      firstName: isNonEmptyString(firstName) ? firstName.trim() : "",
      lastName: isNonEmptyString(lastName) ? lastName.trim() : "",
      username: typeof username === "string" ? normalizeUsername(username) : "",
      email: typeof email === "string" ? normalizeEmail(email) : "",
      password: typeof password === "string" ? password : "",
    },
  };
}

