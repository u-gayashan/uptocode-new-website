import { randomUUID } from "crypto";
import { auditLog } from "@/lib/server/audit";
import { validateRegistration } from "@/lib/auth/validateRegistration";
import { NextResponse } from "next/server";
import type { AuditEventType } from "@/types/auth";

export async function POST(req: Request) {
  const requestId = randomUUID();
  const userAgent = req.headers.get("user-agent") ?? undefined;

  const rawBody = await req.json().catch(() => null);

  const validation = validateRegistration(rawBody);

  const eventTypeAttempt: AuditEventType = "auth.register.attempted";
  await auditLog(eventTypeAttempt, {
    requestId,
    userAgent,
    email: validation.ok ? validation.values.email : undefined,
    username: validation.ok ? validation.values.username : undefined,
  });

  if (!validation.ok) {
    const resp = validation;
    const eventTypeFailed: AuditEventType = "auth.register.failed";
    await auditLog(eventTypeFailed, {
      requestId,
      userAgent,
      payload: resp,
    });

    return NextResponse.json(resp, { status: 400 });
  }

  // TODO: Replace with real persistence (DB) and password hashing.
  const userId = randomUUID();

  const resp = {
    ok: true,
    userId,
  };

  const eventTypeSucceeded: AuditEventType = "auth.register.succeeded";
  await auditLog(eventTypeSucceeded, {
    requestId,
    userAgent,
    email: validation.values.email,
    username: validation.values.username,
    userId,
  });

  return NextResponse.json(resp, { status: 200 });
}

