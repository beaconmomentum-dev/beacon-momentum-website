import { and, desc, eq, gt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, watchMembers, InsertWatchMember, WatchMember, cohortLeadSessions } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Watch Member helpers ──────────────────────────────────────────────────────

export async function insertWatchMember(member: InsertWatchMember): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(watchMembers).values(member);
  return (result[0] as { insertId: number }).insertId;
}

export async function getAllWatchMembers(): Promise<WatchMember[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(watchMembers).orderBy(desc(watchMembers.createdAt));
}

export async function getWatchMembersByLead(leadEmail: string): Promise<WatchMember[]> {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(watchMembers)
    .where(eq(watchMembers.cohortLeadEmail, leadEmail))
    .orderBy(desc(watchMembers.createdAt));
}

export async function updateWatchMemberNotes(id: number, notes: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(watchMembers).set({ leadNotes: notes }).where(eq(watchMembers.id, id));
}

export async function updateWatchMemberAssignment(
  id: number,
  cohortLeadEmail: string | null,
  cohortGroup: string | null
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(watchMembers)
    .set({ cohortLeadEmail, cohortGroup })
    .where(eq(watchMembers.id, id));
}

// ─── Cohort lead session helpers ───────────────────────────────────────────────

export async function createCohortLeadSession(leadEmail: string, token: string, expiresAt: Date): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(cohortLeadSessions).values({ leadEmail, token, expiresAt });
}

export async function getCohortLeadSession(token: string) {
  const db = await getDb();
  if (!db) return undefined;
  const now = new Date();
  const result = await db
    .select()
    .from(cohortLeadSessions)
    .where(and(eq(cohortLeadSessions.token, token), gt(cohortLeadSessions.expiresAt, now)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function deleteCohortLeadSession(token: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(cohortLeadSessions).where(eq(cohortLeadSessions.token, token));
}
