"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const jwt_1 = require("../../../shared/auth/jwt");
const password_1 = require("../../../shared/auth/password");
const resource_roles_repository_1 = require("../resource-roles/resource-roles.repository");
const users_repository_1 = require("../users/users.repository");
const refresh_tokens_service_1 = require("../refresh-tokens/refresh-tokens.service");
const users = new users_repository_1.UsersRepository();
const refreshTokens = new refresh_tokens_service_1.RefreshTokensService();
const resourceRoles = new resource_roles_repository_1.ResourceRolesRepository();
class SessionService {
    async login(username, password, deviceInfo) {
        if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
            throw new app_error_1.AppError(400, "username and password are required");
        }
        const user = await users.findByUsername(username);
        if (!user || user.status !== "active" || !(await (0, password_1.verifyPassword)(password, user.password))) {
            throw new app_error_1.AppError(401, "Invalid credentials");
        }
        const access = (0, jwt_1.signAccessToken)({ id: user.id, username: user.username });
        const refresh = await refreshTokens.issue(user.id, deviceInfo);
        return {
            accessToken: access.token,
            refreshToken: refresh.refreshToken,
            expiresIn: access.expiresIn,
            refreshExpiresAt: refresh.refreshExpiresAt,
            tokenType: "Bearer",
        };
    }
    async refresh(rawToken, deviceInfo) {
        const { userId, issued } = await refreshTokens.rotate(rawToken, deviceInfo);
        const user = await users.findById(userId);
        if (!user || user.status !== "active") {
            await refreshTokens.revokeAllForUser(userId);
            throw new app_error_1.AppError(401, "User is not active");
        }
        const access = (0, jwt_1.signAccessToken)({ id: user.id, username: user.username });
        return {
            accessToken: access.token,
            refreshToken: issued.refreshToken,
            expiresIn: access.expiresIn,
            refreshExpiresAt: issued.refreshExpiresAt,
            tokenType: "Bearer",
        };
    }
    async logout(rawToken) {
        if (typeof rawToken !== "string" || !rawToken) {
            throw new app_error_1.AppError(400, "refreshToken is required");
        }
        await refreshTokens.revoke(rawToken);
    }
    async profile(userId) {
        const user = await users.findById(userId);
        if (!user || user.status !== "active")
            throw new app_error_1.AppError(404, "User not found");
        return { id: user.id, username: user.username, email: user.email, status: user.status };
    }
    myPermissions(userId) {
        return resourceRoles.findEffectiveForUser(userId);
    }
    mySessions(userId) {
        return refreshTokens.listForUser(userId);
    }
    revokeMySessions(userId) {
        return refreshTokens.revokeAllForUser(userId);
    }
}
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map