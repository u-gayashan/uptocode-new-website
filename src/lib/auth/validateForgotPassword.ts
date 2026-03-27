import type {
  ForgotPasswordFieldErrors,
  ForgotPasswordFormValues,
} from "@/types/auth";

export type ValidateForgotPasswordResult =
  | { ok: true; values: ForgotPasswordFormValues }
  | { ok: false; message: string; fieldErrors?: ForgotPasswordFieldErrors };

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

export function validateForgotPassword(
  input: unknown,
):
  ValidateForgotPasswordResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, message: "Invalid request body." };
  }

  const obj = input as Partial<Record<keyof ForgotPasswordFormValues, unknown>>;
  const errors: ForgotPasswordFieldErrors = {};

  const usernameOrEmail = obj.usernameOrEmail;

  if (!isNonEmptyString(usernameOrEmail)) {
    errors.usernameOrEmail = "Username or email is required.";
  } else {
    const raw = usernameOrEmail.trim();
    if (looksLikeEmail(raw)) {
      // Valid email
    } else {
      const u = normalizeUsername(raw);
      if (u.length < 3 || u.length > 20) {
        errors.usernameOrEmail = "Username must be 3-20 characters.";
      } else if (!/^[a-z0-9_]+$/.test(u)) {
        errors.usernameOrEmail =
          "Username can use letters, numbers, and underscore only.";
      }
    }
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
        ? looksLikeEmail(usernameOrEmail.trim())
          ? normalizeEmail(usernameOrEmail)
          : normalizeUsername(usernameOrEmail)
        : "",
    },
  };
}

