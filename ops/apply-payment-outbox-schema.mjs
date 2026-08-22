#!/usr/bin/env node
/**
 * Adds the Stripe-to-Phoenix payment notification outbox without replaying
 * historical migrations. This is additive, idempotent, and intentionally does
 * not alter customer, subscription, payment, or enrollment records.
 */
import mysql from "mysql2/promise";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const sql = `
CREATE TABLE IF NOT EXISTS watch_payment_notifications (
  id int AUTO_INCREMENT NOT NULL,
  stripeEventId varchar(128) NOT NULL,
  billingMode varchar(16) NOT NULL,
  eventType varchar(96) NOT NULL,
  email varchar(320),
  firstName varchar(128),
  stripeCustomerId varchar(64),
  stripeSubscriptionId varchar(64),
  notificationStatus varchar(32) NOT NULL,
  payload json NOT NULL,
  deliveryStatus varchar(32) NOT NULL DEFAULT 'pending',
  attemptCount int NOT NULL DEFAULT 0,
  nextAttemptAt timestamp NULL,
  deliveredAt timestamp NULL,
  lastError text,
  createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT watch_payment_notifications_id PRIMARY KEY(id),
  CONSTRAINT watch_payment_notifications_stripeEventId_unique UNIQUE(stripeEventId)
)`;

const db = await mysql.createConnection(process.env.DATABASE_URL);
try {
  await db.execute(sql);
  const [tables] = await db.query("SHOW TABLES LIKE 'watch_payment_notifications'");
  const [columns] = await db.query("SHOW COLUMNS FROM watch_payment_notifications");
  const names = new Set(columns.map((column) => column.Field));
  for (const required of ["stripeEventId", "payload", "deliveryStatus", "nextAttemptAt"]) {
    if (!names.has(required)) throw new Error(`Outbox schema verification failed: missing ${required}`);
  }
  console.log(JSON.stringify({ ok: true, table: "watch_payment_notifications", columns: columns.length }));
} finally {
  await db.end();
}
