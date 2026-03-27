"use client";

import * as React from "react";
import type {
  LoginFieldErrors,
  LoginFormValues,
  LoginUserResponse,
} from "@/types/auth";
import { TextField } from "@/components/auth/TextField";
import CheckboxToggle from "@/components/auth/CheckboxToggle";

export default function LoginForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [fieldErrors, setFieldErrors] = React.useState<LoginFieldErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const formData = new FormData(e.currentTarget);
      const payload: LoginFormValues = {
        usernameOrEmail: String(formData.get("usernameOrEmail") ?? ""),
        password: String(formData.get("password") ?? ""),
        rememberMe,
      };

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as LoginUserResponse;
      if (!data.ok) {
        setFormError(data.message);
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        return;
      }

      // For now no redirect—hook up sessions next.
      e.currentTarget.reset();
      setFieldErrors({});
      setRememberMe(false);
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <TextField
        id="usernameOrEmail"
        name="usernameOrEmail"
        label="Username or email"
        placeholder="Username or email"
        icon="user"
        autoComplete="username"
        error={fieldErrors.usernameOrEmail}
        hideLabel
      />

      <TextField
        id="password"
        name="password"
        label="Password"
        placeholder="Password"
        type="password"
        icon="lock"
        autoComplete="current-password"
        showPasswordToggle
        error={fieldErrors.password}
        labelRight={
          <a
              href="/forgot-password"
          >
            Forgot Password?
          </a>
        }
      />

      <CheckboxToggle
        id="rememberMe"
        label="Remember Me"
        checked={rememberMe}
        onCheckedChange={setRememberMe}
      />

      <div
        className="h-0 overflow-hidden"
        aria-live="polite"
        aria-atomic="true"
      >
        {formError ? formError : null}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="h-11 w-full rounded-md bg-[#d5f83e] text-base font-medium text-[#161a10] transition hover:bg-[#d9ff49] disabled:opacity-70 sm:h-12 sm:text-[19px]"
      >
        {submitting ? "Logging In..." : "Log In"}
      </button>
    </form>
  );
}

