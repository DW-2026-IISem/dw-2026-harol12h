import { Response } from "express";
import { AppError } from "../errors/app-error";

export function sendError(res: Response, error: unknown): void {
  if (error instanceof AppError) {
    const appErr = error as AppError;
    res.status(appErr.statusCode).json({ error: appErr.message });
    return;
  }
  res.status(500).json({ error: "Internal server error", detail: String(error) });
}
