import { NextFunction, Request, Response } from "express";
import { attachAuthenticatedUser } from "../features/auth/access/authenticate.middleware";
import { Role } from "../features/auth/roles/role.model";
import { RoleUser } from "../features/auth/role-users/role-user.model";
import { authorize } from "../features/auth/access/authorize.middleware";
import { AppError } from "../shared/errors/app-error";
import { sendError } from "../shared/http/error-response";
import "../shared/auth/auth-user";

export async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await attachAuthenticatedUser(req);
    await authorize(req, res, next);
  } catch (error) {
    sendError(res, error);
  }
}

function normalizeRoleName(role: string): string {
  const normalized = role.trim().toLowerCase();
  return normalized === "admin" ? "administrador" : normalized;
}

export const checkRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.auth) {
      sendError(res, new AppError(401, "Authentication required"));
      return;
    }

    try {
      const assignments = await RoleUser.findAll({
        where: { user_id: req.auth.id, status: "active" },
      });
      const roleIds = assignments.map((assignment) => assignment.role_id);
      const roles = await Role.findAll({
        where: { id: roleIds, status: "active" },
      });
      const allowed = new Set(allowedRoles.map(normalizeRoleName));

      if (!roles.some((role) => allowed.has(normalizeRoleName(role.name)))) {
        throw new AppError(403, "No tienes permisos suficientes para realizar esta acción.");
      }

      next();
    } catch (error) {
      sendError(res, error);
    }
  };
};
