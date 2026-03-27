import type { AuditEventType } from "@/types/auth";
import { auditLog } from "@/lib/server/audit";
import { NextResponse } from "next/server";

type AuditLogRequest = {
  eventType: AuditEventType;
  payload?: {
    [key: string]: unknown;
  };
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as AuditLogRequest | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const { eventType, payload } = body;
  if (!eventType || typeof eventType !== "string") {
    return NextResponse.json(
      { ok: false, message: "eventType is required." },
      { status: 400 },
    );
  }

  await auditLog(eventType, payload ?? {});

  return NextResponse.json({ ok: true }, { status: 200 });
}

