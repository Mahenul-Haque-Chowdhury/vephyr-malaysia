import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { AuthUser, UserKind } from "@/types/auth";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function ensureUsersFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, "[]\n", "utf8");
  }
}

async function readUsers(): Promise<AuthUser[]> {
  await ensureUsersFile();
  const raw = await fs.readFile(USERS_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AuthUser[]) : [];
  } catch {
    return [];
  }
}

async function writeUsers(users: AuthUser[]) {
  await ensureUsersFile();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2) + "\n", "utf8");
}

function hashPassword(password: string, saltBase64?: string) {
  const salt = saltBase64
    ? Buffer.from(saltBase64, "base64")
    : crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return {
    saltBase64: salt.toString("base64"),
    hashBase64: hash.toString("base64"),
  };
}

function constantTimeEqual(aBase64: string, bBase64: string) {
  const a = Buffer.from(aBase64, "base64");
  const b = Buffer.from(bBase64, "base64");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function getUserByEmail(emailRaw: string): Promise<AuthUser | null> {
  const email = emailRaw.trim().toLowerCase();
  const users = await readUsers();
  const found = users.find((u) => u.email.toLowerCase() === email);
  return found ?? null;
}

export async function verifyUserPassword(params: {
  email: string;
  password: string;
}): Promise<AuthUser | null> {
  const user = await getUserByEmail(params.email);
  if (!user) return null;
  if (!user.passwordSalt || !user.passwordHash) return null;
  const computed = hashPassword(params.password, user.passwordSalt);
  if (!constantTimeEqual(computed.hashBase64, user.passwordHash)) return null;
  return user;
}

export async function updateUserById(params: {
  userId: string;
  name?: string;
  addresses?: AuthUser["addresses"];
  settings?: AuthUser["settings"];
  newPassword?: string;
}): Promise<AuthUser | null> {
  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === params.userId);
  if (idx === -1) return null;

  const now = new Date().toISOString();
  const existing = users[idx];
  const updated: AuthUser = {
    ...existing,
    name: params.name ?? existing.name,
    addresses: params.addresses ?? existing.addresses,
    settings: params.settings ?? existing.settings,
    lastSeenAt: now,
  };

  if (params.newPassword && params.newPassword.trim().length > 0) {
    const { saltBase64, hashBase64 } = hashPassword(params.newPassword);
    updated.passwordSalt = saltBase64;
    updated.passwordHash = hashBase64;
    updated.kind = "account";
  }

  users[idx] = updated;
  await writeUsers(users);
  return updated;
}

export async function upsertUserByEmail(params: {
  email: string;
  name?: string;
  kind: UserKind;
  password?: string;
}): Promise<AuthUser> {
  const email = params.email.trim().toLowerCase();
  const now = new Date().toISOString();

  const users = await readUsers();
  const existingIndex = users.findIndex((u) => u.email.toLowerCase() === email);

  if (existingIndex !== -1) {
    const existing = users[existingIndex];
    const upgradedKind: UserKind =
      existing.kind === "guest" && params.kind === "account" ? "account" : existing.kind;

    const updated: AuthUser = {
      ...existing,
      name: params.name ?? existing.name,
      kind: upgradedKind,
      lastSeenAt: now,
    };

    if (params.password && params.password.trim().length > 0 && params.kind === "account") {
      const { saltBase64, hashBase64 } = hashPassword(params.password);
      updated.passwordSalt = saltBase64;
      updated.passwordHash = hashBase64;
      updated.kind = "account";
    }

    users[existingIndex] = updated;
    await writeUsers(users);
    return updated;
  }

  const created: AuthUser = {
    id: crypto.randomUUID(),
    email,
    name: params.name,
    kind: params.kind,
    createdAt: now,
    lastSeenAt: now,
  };

  if (params.password && params.password.trim().length > 0 && params.kind === "account") {
    const { saltBase64, hashBase64 } = hashPassword(params.password);
    created.passwordSalt = saltBase64;
    created.passwordHash = hashBase64;
  }

  users.unshift(created);
  await writeUsers(users);
  return created;
}
