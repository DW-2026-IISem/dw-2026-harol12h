import jwt, { JwtPayload } from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { AppError } from "../errors/app-error";

const ALGORITHM = "HS256";
export const TOKEN_ISSUER = "trama-moda-express";
export const TOKEN_AUDIENCE = "trama-moda-api";
export const ACCESS_TOKEN_TTL_SECONDS = Number(process.env.JWT_ACCESS_TTL ?? 900);

export interface AccessTokenPayload extends JwtPayload {
  sub: string;
  username: string;
  jti: string;
}

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new AppError(500, "JWT_SECRET no configurado (mínimo 32 caracteres). Ver .env");
  }
  return secret;
}

function getAccessTokenTtl(): number {
  if (!Number.isInteger(ACCESS_TOKEN_TTL_SECONDS) || ACCESS_TOKEN_TTL_SECONDS < 1) {
    throw new AppError(500, "JWT_ACCESS_TTL must be a positive integer");
  }
  return ACCESS_TOKEN_TTL_SECONDS;
}

export function signAccessToken(user: { id: number; username: string }): { token: string; expiresIn: number } {
  const expiresIn = getAccessTokenTtl();
  const token = jwt.sign(
    { username: user.username },
    getSecret(),
    {
      algorithm: ALGORITHM,
      subject: String(user.id),
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
      expiresIn,
      jwtid: randomUUID(),
    }
  );
  return { token, expiresIn };
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  let payload: JwtPayload;
  try {
    payload = jwt.verify(token, getSecret(), {
      algorithms: [ALGORITHM],
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
      clockTolerance: 5,
    }) as JwtPayload;
  } catch {
    throw new AppError(401, "Invalid or expired access token");
  }

  if (
    typeof payload.sub !== "string" ||
    !/^[1-9]\d*$/.test(payload.sub) ||
    typeof payload.jti !== "string" ||
    payload.jti.length === 0
  ) {
    throw new AppError(401, "Invalid or expired access token");
  }

  return payload as AccessTokenPayload;
}

export function extractBearerToken(header: string | undefined): string | null {
  if (!header) return null;
  const [scheme, value] = header.split(" ");
  if (!scheme || !value || scheme.toLowerCase() !== "bearer") return null;
  return value;
}
