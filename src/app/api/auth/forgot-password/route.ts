import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { auditLog } from "@/lib/server/audit";
import { validateForgotPassword } from "@/lib/auth/validateForgotPassword";
import type { AuditEventType } from "@/types/auth";

export async function POST(req: Request) {
  const requestId = randomUUID();
  const userAgent = req.headers.get("user-agent") ?? undefined;

  const rawBody = await req.json().catch(() => null);
  const validation = validateForgotPassword(rawBody);

  const eventTypeAttempt: AuditEventType = "auth.forgot_password.attempted";
  await auditLog(eventTypeAttempt, {
    requestId,
    userAgent,
    usernameOrEmail: validation.ok ? validation.values.usernameOrEmail : undefined,
  });

  if (!validation.ok) {
    const resp = validation;
    const eventTypeFailed: AuditEventType = "auth.forgot_password.failed";
    await auditLog(eventTypeFailed, {
      requestId,
      userAgent,
      payload: resp,
    });
    return NextResponse.json(resp, { status: 400 });
  }

  // TODO: Replace with real password-reset flow (DB + email/verification).
  const resetRequestId = randomUUID();

  const eventTypeSucceeded: AuditEventType = "auth.forgot_password.succeeded";
  await auditLog(eventTypeSucceeded, {
    requestId,
    userAgent,
    usernameOrEmail: validation.values.usernameOrEmail,
    resetRequestId,
  });

  return NextResponse.json(
    { ok: true, requestId: resetRequestId },
    { status: 200 },
  );
}

