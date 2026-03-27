export type AuthProvider = "google" | "outlook" | "apple";

export type RegistrationFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export type FieldErrors = Partial<
  Record<keyof RegistrationFormValues, string>
>;

export type RegisterUserResponse =
  | {
      ok: true;
      userId: string;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: FieldErrors;
    };

export type LoginFormValues = {
  usernameOrEmail: string;
  password: string;
  rememberMe: boolean;
};

export type LoginFieldErrors = Partial<
  Record<keyof LoginFormValues, string>
>;

export type LoginUserResponse =
  | {
      ok: true;
      userId: string;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: LoginFieldErrors;
    };

export type ForgotPasswordFormValues = {
  usernameOrEmail: string;
};

export type ForgotPasswordFieldErrors = Partial<
  Record<keyof ForgotPasswordFormValues, string>
>;

export type ForgotPasswordUserResponse =
  | {
      ok: true;
      requestId: string;
    }
  | {
      ok: false;
      message: string;
      fieldErrors?: ForgotPasswordFieldErrors;
    };

export type AuditEventType =
  | "auth.register.attempted"
  | "auth.register.succeeded"
  | "auth.register.failed"
  | "auth.login.attempted"
  | "auth.login.succeeded"
  | "auth.login.failed"
  | "auth.forgot_password.attempted"
  | "auth.forgot_password.succeeded"
  | "auth.forgot_password.failed";

