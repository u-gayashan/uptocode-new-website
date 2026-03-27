"use client";

import * as React from "react";
import type {
  FieldErrors,
  RegistrationFormValues,
  RegisterUserResponse,
} from "@/types/auth";
import { TextField } from "@/components/auth/TextField";

export default function SignupForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      // Send to Python backend with both field name formats for compatibility
      const payload = {
        // Legacy format
        email: String(formData.get("email") ?? ""),
        name: `${String(formData.get("firstName") ?? "")} ${String(formData.get("lastName") ?? "")}`.trim(),
        password: String(formData.get("password") ?? ""),
        // Clerk-style format
        primary_email: String(formData.get("email") ?? ""),
        first_name: String(formData.get("firstName") ?? ""),
        last_name: String(formData.get("lastName") ?? ""),
        username: String(formData.get("username") ?? ""),
      };

      const res = await fetch("http://localhost:8000/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: "Registration failed" }));
        setFormError(error.detail || error.message || "Registration failed");
        return;
      }

      // For now just clear the form; when you add real auth, redirect here.
      form.reset();
      setFieldErrors({});
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-3 xl:space-y-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          placeholder="First Name"
          icon="user"
          autoComplete="given-name"
          error={fieldErrors.firstName}
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          icon="user"
          autoComplete="family-name"
          error={fieldErrors.lastName}
        />
      </div>

      <TextField
        id="username"
        name="username"
        label="Username"
        placeholder="Username"
        icon="user"
        autoComplete="username"
        error={fieldErrors.username}
      />

      <TextField
        id="email"
        name="email"
        label="Email"
        placeholder="Email"
        type="email"
        icon="mail"
        autoComplete="email"
        error={fieldErrors.email}
      />

      <TextField
        id="password"
        name="password"
        label="Password"
        placeholder="Password"
        type="password"
        icon="lock"
        autoComplete="new-password"
        showPasswordToggle
        error={fieldErrors.password}
      />

      {/* Keep the minimum-length line aligned with the screenshot */}
      <p className="-mt-1 text-sm text-[#848e99]">
        Minimum length is 8 characters.
      </p>

      {/* Invisible-by-default to avoid shifting layout */}
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
        className="mt-1 h-[44px] xl:h-[50px] w-full rounded-lg bg-[#d5f83e] text-base font-semibold text-[#161a10] transition hover:bg-[#d9ff49] disabled:opacity-70 sm:text-[17px]"
      >
        {submitting ? "Signing..." : "Sign Up"}
      </button>
    </form>
  );
}

