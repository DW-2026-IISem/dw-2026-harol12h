import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../shared/errors/app-error";
import { sendError } from "../../../shared/http/error-response";
import { extractBearerToken, verifyAccessToken } from "../../../shared/auth/jwt";
import { UsersRepository } from "../users/users.repository";

const usersRepository = new UsersRepository();

export async function attachAuthenticatedUser(req: Request): Promise<void> {
  const token = extractBearerToken(req.headers.authorization);
  if (!token) throw new AppError(401, "Missing Bearer token");

  const payload = verifyAccessToken(token);
  const userId = Number(payload.sub);
  if (!Number.isInteger(userId) || userId < 1) {
    throw new AppError(401, "Invalid or expired access token");
  }

  const user = await usersRepository.findById(userId);
  if (!user || user.status !== "active") {
    throw new AppError(401, "User is not active");
  }

  req.auth = {
    id: user.id,
    username: user.username,
    email: user.email,
    tokenId: payload.jti,
  };
}

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await attachAuthenticatedUser(req);
    next();
  } catch (error) {
    sendError(res, error);
  }
}
