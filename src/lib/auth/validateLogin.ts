import type {
  LoginFieldErrors,
  LoginFormValues,
} from "@/types/auth";

export type ValidateLoginResult =
  | { ok: true; values: LoginFormValues }
  | { ok: false; message: string; fieldErrors?: LoginFieldErrors };

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeUsername(username: string) {
  return username.trim().toLowerCase();
}

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateLogin(
  input: unknown,
): ValidateLoginResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, message: "Invalid request body." };
  }

  const obj = input as Partial<Record<keyof LoginFormValues, unknown>>;

  const errors: LoginFieldErrors = {};

  const usernameOrEmail = obj.usernameOrEmail;
  const password = obj.password;
  const rememberMe = obj.rememberMe;

  if (!isNonEmptyString(usernameOrEmail)) {
    errors.usernameOrEmail = "Username or email is required.";
  } else {
    const raw = usernameOrEmail.trim();
    if (looksLikeEmail(raw)) {
      const email = normalizeEmail(raw);
      if (!looksLikeEmail(email)) {
        errors.usernameOrEmail = "Enter a valid email address.";
      }
    } else {
      const u = normalizeUsername(raw);
      if (u.length < 3 || u.length > 20) {
        errors.usernameOrEmail = "Username must be 3-20 characters.";
      } else if (!/^[a-z0-9_]+$/.test(u)) {
        errors.usernameOrEmail = "Username can use letters, numbers, and underscore only.";
      }
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
      usernameOrEmail: isNonEmptyString(usernameOrEmail)
        ? usernameOrEmail.trim()
        : "",
      password: typeof password === "string" ? password : "",
      rememberMe: typeof rememberMe === "boolean" ? rememberMe : false,
    },
  };
}

