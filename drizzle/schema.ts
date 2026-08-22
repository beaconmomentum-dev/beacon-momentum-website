import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Watch intake submissions — stores every completed intake form.
 * Populated server-side when a member completes /the-watch/intake.
 */
export const watchMembers = mysqlTable("watch_members", {
  id: int("id").autoincrement().primaryKey(),
  /** Email address from checkout and later intake submission. */
  email: varchar("email", { length: 320 }).notNull(),
  /** First name (optional, from sessionStorage) */
  firstName: varchar("firstName", { length: 128 }),
  /** Membership tier: sentinel | navigator | quartermaster */
  tier: varchar("tier", { length: 32 }),
  /** Assigned cohort track: transition | builder | systems | legacy */
  track: varchar("track", { length: 32 }),
  /**
   * Full JSON blob of all 7 intake answers.
   * Shape: { tier, current_situation, biggest_obstacle, time_horizon, ai_comfort, accountability, track_choice }
   */
  intakeAnswers: json("intakeAnswers"),
  /** Optional: cohort lead assignment (email of the lead responsible for this member) */
  cohortLeadEmail: varchar("cohortLeadEmail", { length: 320 }),
  /** Optional: cohort group name or label */
  cohortGroup: varchar("cohortGroup", { length: 128 }),
  /** Notes added by a cohort lead */
  leadNotes: text("leadNotes"),
  /** Stripe customer identifier retained only for billing reconciliation. */
  stripeCustomerId: varchar("stripeCustomerId", { length: 64 }),
  /** One Watch enrollment row is authoritative for one Stripe subscription. */
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 64 }).unique(),
  /** Keeps internal Stripe test-mode lifecycle records out of the live member workflow. */
  billingMode: varchar("billingMode", { length: 16 }).notNull().default("live"),
  /** Durable billing state: pending | active | past_due | cancelled. */
  enrollmentStatus: varchar("enrollmentStatus", { length: 32 }).notNull().default("pending"),
  /** Timestamp of the most recent successful annual invoice payment. */
  paidAt: timestamp("paidAt"),
  /** Stripe-reported end of the active annual billing period. */
  renewsAt: timestamp("renewsAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WatchMember = typeof watchMembers.$inferSelect;
export type InsertWatchMember = typeof watchMembers.$inferInsert;

/**
 * Durable handoff queue from Stripe lifecycle processing to Phoenix. The Stripe
 * webhook persists the business state first, then emits one idempotent event to
 * this outbox. Delivery retries never replay a customer charge.
 */
export const watchPaymentNotifications = mysqlTable("watch_payment_notifications", {
  id: int("id").autoincrement().primaryKey(),
  stripeEventId: varchar("stripeEventId", { length: 128 }).notNull().unique(),
  billingMode: varchar("billingMode", { length: 16 }).notNull(),
  eventType: varchar("eventType", { length: 96 }).notNull(),
  email: varchar("email", { length: 320 }),
  firstName: varchar("firstName", { length: 128 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 64 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 64 }),
  notificationStatus: varchar("notificationStatus", { length: 32 }).notNull(),
  payload: json("payload").notNull(),
  deliveryStatus: varchar("deliveryStatus", { length: 32 }).notNull().default("pending"),
  attemptCount: int("attemptCount").notNull().default(0),
  nextAttemptAt: timestamp("nextAttemptAt"),
  deliveredAt: timestamp("deliveredAt"),
  lastError: text("lastError"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WatchPaymentNotification = typeof watchPaymentNotifications.$inferSelect;
export type InsertWatchPaymentNotification = typeof watchPaymentNotifications.$inferInsert;

/**
 * Cohort lead sessions — simple password-based access for cohort leads.
 * A cohort lead authenticates with a shared password (stored as env var COHORT_LEAD_PASSWORD).
 * On success, a short-lived session token is issued and stored here.
 */
export const cohortLeadSessions = mysqlTable("cohort_lead_sessions", {
  id: int("id").autoincrement().primaryKey(),
  /** Opaque session token (UUID) */
  token: varchar("token", { length: 128 }).notNull().unique(),
  /** Which cohort lead email this session belongs to (entered at login) */
  leadEmail: varchar("leadEmail", { length: 320 }).notNull(),
  /** UTC ms expiry timestamp */
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CohortLeadSession = typeof cohortLeadSessions.$inferSelect;
export type InsertCohortLeadSession = typeof cohortLeadSessions.$inferInsert;

/**
 * Community Build Award entries — stores free entry submissions
 * for the annual $4,970 purpose-based drawing.
 * One entry per email per annual cycle, enforced by unique key.
 */
export const communityBuildEntries = mysqlTable("community_build_entries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  city: varchar("city", { length: 128 }).notNull(),
  state: varchar("state", { length: 64 }).notNull(),
  cycle: varchar("cycle", { length: 32 }).notNull().default("2026-2027"),
  ipAddress: varchar("ip_address", { length: 45 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type CommunityBuildEntry = typeof communityBuildEntries.$inferSelect;
export type InsertCommunityBuildEntry = typeof communityBuildEntries.$inferInsert;
