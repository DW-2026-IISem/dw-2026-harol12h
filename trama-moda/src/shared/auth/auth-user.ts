import { Request } from "express";
import { AppError } from "../errors/app-error";

export interface AuthUser {
  id: number;
  username: string;
  email?: string;
  tokenId?: string;
}

export function requireAuthUser(req: Request): AuthUser {
  if (!req.auth) {
    throw new AppError(401, "Authentication required");
  }
  return req.auth;
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthUser;
    }
  }
}

export {};
