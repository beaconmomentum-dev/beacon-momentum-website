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
  /** Email address from sessionStorage at intake submission time */
  email: varchar("email", { length: 320 }).notNull(),
  /** First name (optional, from sessionStorage) */
  firstName: varchar("firstName", { length: 128 }),
  /** Membership tier: sentinel | navigator | quartermaster */
  tier: varchar("tier", { length: 32 }).notNull(),
  /** Assigned cohort track: transition | builder | systems | legacy */
  track: varchar("track", { length: 32 }).notNull(),
  /**
   * Full JSON blob of all 7 intake answers.
   * Shape: { tier, current_situation, biggest_obstacle, time_horizon, ai_comfort, accountability, track_choice }
   */
  intakeAnswers: json("intakeAnswers").notNull(),
  /** Optional: cohort lead assignment (email of the lead responsible for this member) */
  cohortLeadEmail: varchar("cohortLeadEmail", { length: 320 }),
  /** Optional: cohort group name or label */
  cohortGroup: varchar("cohortGroup", { length: 128 }),
  /** Notes added by a cohort lead */
  leadNotes: text("leadNotes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WatchMember = typeof watchMembers.$inferSelect;
export type InsertWatchMember = typeof watchMembers.$inferInsert;

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
