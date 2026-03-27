import type { AuditEventType } from "@/types/auth";

export async function auditLog(
  eventType: AuditEventType,
  payload: {
    email?: string;
    username?: string;
    userAgent?: string;
    requestId?: string;
    [key: string]: unknown;
  },
) {
  // Server-only: replace this with your DB/queue logger later.
  // Keep logs structured so they can be queried easily.
  console.info(
    JSON.stringify({
      eventType,
      ...payload,
      ts: new Date().toISOString(),
    }),
  );
}

