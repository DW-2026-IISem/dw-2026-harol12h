import { hash, compare } from "bcryptjs";
import { createHash, randomBytes } from "node:crypto";

const SALT_ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  return hash(plain, SALT_ROUNDS);
}

export async function comparePassword(plain: string, passwordHash: string): Promise<boolean> {
  return compare(plain, passwordHash);
}

export const verifyPassword = comparePassword;

export function sha256Hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function generateOpaqueToken(): string {
  return randomBytes(64).toString("base64url");
}
