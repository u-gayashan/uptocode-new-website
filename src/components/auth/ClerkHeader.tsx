"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function ClerkHeader() {
  const pathname = usePathname();

  if (
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/chat")
  ) {
    return null;
  }

  return (
    <header className="px-4 py-3 flex items-center justify-end gap-3">
      <Show when="signed-out">
        <SignInButton />
        <SignUpButton />
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </header>
  );
}

