"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
exports.verifyToken = verifyToken;
const authenticate_middleware_1 = require("../features/auth/access/authenticate.middleware");
const role_model_1 = require("../features/auth/roles/role.model");
const role_user_model_1 = require("../features/auth/role-users/role-user.model");
const authorize_middleware_1 = require("../features/auth/access/authorize.middleware");
const app_error_1 = require("../shared/errors/app-error");
const error_response_1 = require("../shared/http/error-response");
require("../shared/auth/auth-user");
async function verifyToken(req, res, next) {
    try {
        await (0, authenticate_middleware_1.attachAuthenticatedUser)(req);
        await (0, authorize_middleware_1.authorize)(req, res, next);
    }
    catch (error) {
        (0, error_response_1.sendError)(res, error);
    }
}
function normalizeRoleName(role) {
    const normalized = role.trim().toLowerCase();
    return normalized === "admin" ? "administrador" : normalized;
}
const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
        if (!req.auth) {
            (0, error_response_1.sendError)(res, new app_error_1.AppError(401, "Authentication required"));
            return;
        }
        try {
            const assignments = await role_user_model_1.RoleUser.findAll({
                where: { user_id: req.auth.id, status: "active" },
            });
            const roleIds = assignments.map((assignment) => assignment.role_id);
            const roles = await role_model_1.Role.findAll({
                where: { id: roleIds, status: "active" },
            });
            const allowed = new Set(allowedRoles.map(normalizeRoleName));
            if (!roles.some((role) => allowed.has(normalizeRoleName(role.name)))) {
                throw new app_error_1.AppError(403, "No tienes permisos suficientes para realizar esta acción.");
            }
            next();
        }
        catch (error) {
            (0, error_response_1.sendError)(res, error);
        }
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=auth.middleware.js.map