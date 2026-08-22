import { and, asc, eq, lte } from "drizzle-orm";
import { watchPaymentNotifications } from "../../drizzle/schema";
import { getDb } from "../db";
import { ENV } from "../_core/env";

export type PaymentNotificationStatus = "active" | "past_due" | "cancelled" | "pending";

export interface PaymentNotificationInput {
  stripeEventId: string;
  billingMode: "live" | "test";
  eventType: string;
  email: string | null;
  firstName: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  notificationStatus: PaymentNotificationStatus;
}

const RETRY_SECONDS = [60, 300, 1800, 7200, 21600, 86400];

function tagsForStatus(status: PaymentNotificationStatus): string[] {
  if (status === "active") return ["BM_Member", "BM_Payment_Active"];
  if (status === "past_due") return ["BM_Payment_Past_Due"];
  if (status === "cancelled") return ["BM_Payment_Cancelled"];
  return ["BM_Payment_Pending"];
}

function nextRetry(attemptCount: number): Date {
  const seconds = RETRY_SECONDS[Math.min(Math.max(attemptCount, 0), RETRY_SECONDS.length - 1)];
  return new Date(Date.now() + seconds * 1000);
}

export async function enqueuePaymentNotification(input: PaymentNotificationInput): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available for payment notification outbox");
  const payload = { ...input, tags: tagsForStatus(input.notificationStatus) };
  await db.insert(watchPaymentNotifications).values({
    stripeEventId: input.stripeEventId,
    billingMode: input.billingMode,
    eventType: input.eventType,
    email: input.email,
    firstName: input.firstName,
    stripeCustomerId: input.stripeCustomerId,
    stripeSubscriptionId: input.stripeSubscriptionId,
    notificationStatus: input.notificationStatus,
    payload,
    deliveryStatus: "pending",
    nextAttemptAt: new Date(),
  }).onDuplicateKeyUpdate({ set: { updatedAt: new Date() } });
}

async function markDelivered(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available for payment notification outbox");
  await db.update(watchPaymentNotifications).set({
    deliveryStatus: "delivered", deliveredAt: new Date(), nextAttemptAt: null, lastError: null,
  }).where(eq(watchPaymentNotifications.id, id));
}

async function markRetry(id: number, currentAttempts: number, error: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available for payment notification outbox");
  const attempts = currentAttempts + 1;
  await db.update(watchPaymentNotifications).set({
    deliveryStatus: attempts >= 10 ? "dead_letter" : "pending",
    attemptCount: attempts,
    nextAttemptAt: attempts >= 10 ? null : nextRetry(attempts),
    lastError: error.slice(0, 1800),
  }).where(eq(watchPaymentNotifications.id, id));
}

/**
 * Deliver durable payment facts to Phoenix. This does not charge a card, change a
 * subscription, or grant access; Phoenix applies its own mandate and preflight.
 */
export async function deliverPendingPaymentNotifications(limit = 20): Promise<{ delivered: number; retried: number; deadLettered: number }> {
  const db = await getDb();
  if (!db || !ENV.phoenixPaymentNotificationUrl || !ENV.phoenixPaymentNotificationToken) {
    return { delivered: 0, retried: 0, deadLettered: 0 };
  }
  const now = new Date();
  const rows = await db.select().from(watchPaymentNotifications).where(and(
    eq(watchPaymentNotifications.deliveryStatus, "pending"),
    lte(watchPaymentNotifications.nextAttemptAt, now),
  )).orderBy(asc(watchPaymentNotifications.id)).limit(Math.min(Math.max(limit, 1), 100));

  let delivered = 0, retried = 0, deadLettered = 0;
  for (const row of rows) {
    try {
      const response = await fetch(`${ENV.phoenixPaymentNotificationUrl.replace(/\/$/, "")}/api/autonomy/payments/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ENV.phoenixPaymentNotificationToken}`,
          "Idempotency-Key": row.stripeEventId,
        },
        body: JSON.stringify(row.payload),
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) throw new Error(`Phoenix intake returned ${response.status}`);
      await markDelivered(row.id);
      delivered += 1;
    } catch (error) {
      const attempts = row.attemptCount + 1;
      await markRetry(row.id, row.attemptCount, error instanceof Error ? error.message : "Phoenix delivery failed");
      if (attempts >= 10) deadLettered += 1; else retried += 1;
    }
  }
  return { delivered, retried, deadLettered };
}
