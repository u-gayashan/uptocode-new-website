"use client";

import * as React from "react";
import type {
  ForgotPasswordFieldErrors,
  ForgotPasswordFormValues,
  ForgotPasswordUserResponse,
} from "@/types/auth";
import { TextField } from "@/components/auth/TextField";

export default function ForgotPasswordForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<ForgotPasswordFieldErrors>(
    {},
  );
  const [formError, setFormError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const formData = new FormData(e.currentTarget);
      const payload: ForgotPasswordFormValues = {
        usernameOrEmail: String(formData.get("usernameOrEmail") ?? ""),
      };

      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as ForgotPasswordUserResponse;
      if (!data.ok) {
        setFormError(data.message);
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        return;
      }

      // In real flow, show confirmation / redirect.
      e.currentTarget.reset();
      setFieldErrors({});
      setFormError(null);
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <div className="text-[13px] text-[#dae1ea]">
          Username or email
        </div>
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
      </div>

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
        {submitting ? "Please wait..." : "Login"}
      </button>
    </form>
  );
}

