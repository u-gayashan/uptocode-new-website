import { randomUUID } from "crypto";
import { auditLog } from "@/lib/server/audit";
import { validateLogin } from "@/lib/auth/validateLogin";
import { NextResponse } from "next/server";
import type { AuditEventType } from "@/types/auth";

export async function POST(req: Request) {
  const requestId = randomUUID();
  const userAgent = req.headers.get("user-agent") ?? undefined;

  const rawBody = await req.json().catch(() => null);
  const validation = validateLogin(rawBody);

  const eventTypeAttempt: AuditEventType = "auth.login.attempted";
  await auditLog(eventTypeAttempt, {
    requestId,
    userAgent,
    usernameOrEmail: validation.ok ? validation.values.usernameOrEmail : undefined,
  });

  if (!validation.ok) {
    const resp = validation;
    const eventTypeFailed: AuditEventType = "auth.login.failed";
    await auditLog(eventTypeFailed, {
      requestId,
      userAgent,
      payload: resp,
    });
    return NextResponse.json(resp, { status: 400 });
  }

  // TODO: Replace with real authentication (DB) + password hashing verification.
  const userId = randomUUID();

  const eventTypeSucceeded: AuditEventType = "auth.login.succeeded";
  await auditLog(eventTypeSucceeded, {
    requestId,
    userAgent,
    userId,
    usernameOrEmail: validation.values.usernameOrEmail,
    rememberMe: validation.values.rememberMe,
  });

  return NextResponse.json({ ok: true, userId }, { status: 200 });
}

