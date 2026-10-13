"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokensService = void 0;
const node_crypto_1 = require("node:crypto");
const db_1 = require("../../../database/db");
const app_error_1 = require("../../../shared/errors/app-error");
const password_1 = require("../../../shared/auth/password");
const refresh_tokens_repository_1 = require("./refresh-tokens.repository");
const user_model_1 = require("../users/user.model");
const repository = new refresh_tokens_repository_1.RefreshTokensRepository();
function refreshExpiry() {
    const ttlDays = Number(process.env.JWT_REFRESH_TTL_DAYS ?? 30);
    if (!Number.isInteger(ttlDays) || ttlDays < 1 || ttlDays > 365) {
        throw new app_error_1.AppError(500, "JWT_REFRESH_TTL_DAYS must be an integer between 1 and 365");
    }
    return new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);
}
class RefreshTokensService {
    async issue(userId, deviceInfo, familyId = (0, node_crypto_1.randomUUID)()) {
        const refreshToken = (0, password_1.generateOpaqueToken)();
        const refreshExpiresAt = refreshExpiry();
        const transaction = await db_1.sequelize.transaction();
        try {
            await repository.create({
                user_id: userId,
                token_hash: (0, password_1.sha256Hex)(refreshToken),
                family_id: familyId,
                expires_at: refreshExpiresAt,
                device_info: deviceInfo?.slice(0, 500) ?? null,
            }, transaction);
            await transaction.commit();
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
        return { refreshToken, refreshExpiresAt, familyId };
    }
    async rotate(rawToken, deviceInfo) {
        if (!rawToken || rawToken.length > 512) {
            throw new app_error_1.AppError(401, "Invalid or expired refresh token");
        }
        const transaction = await db_1.sequelize.transaction();
        let result;
        let invalid = false;
        try {
            const token = await repository.findByHashForUpdate((0, password_1.sha256Hex)(rawToken), transaction);
            if (!token) {
                invalid = true;
            }
            else if (token.status !== "active" || token.expires_at.getTime() <= Date.now()) {
                await repository.revokeFamily(token.family_id, transaction);
                invalid = true;
            }
            else {
                const user = await user_model_1.User.findByPk(token.user_id, { transaction, lock: transaction.LOCK.UPDATE });
                if (!user || user.status !== "active") {
                    await repository.revokeFamily(token.family_id, transaction);
                    invalid = true;
                }
                else {
                    await token.update({ status: "inactive" }, { transaction });
                    const issued = await this.issueInTransaction(user.id, token.family_id, deviceInfo, transaction);
                    result = { userId: user.id, issued };
                }
            }
            await transaction.commit();
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
        if (invalid || !result) {
            throw new app_error_1.AppError(401, "Invalid or expired refresh token");
        }
        return result;
    }
    async revoke(rawToken) {
        if (!rawToken || rawToken.length > 512)
            return false;
        return repository.revokeByHash((0, password_1.sha256Hex)(rawToken));
    }
    revokeAllForUser(userId) {
        return repository.revokeAllForUser(userId);
    }
    listForUser(userId) {
        return repository.listForUser(userId);
    }
    async issueInTransaction(userId, familyId, deviceInfo, transaction) {
        const refreshToken = (0, password_1.generateOpaqueToken)();
        const refreshExpiresAt = refreshExpiry();
        await repository.create({
            user_id: userId,
            token_hash: (0, password_1.sha256Hex)(refreshToken),
            family_id: familyId,
            expires_at: refreshExpiresAt,
            device_info: deviceInfo?.slice(0, 500) ?? null,
        }, transaction);
        return { refreshToken, refreshExpiresAt, familyId };
    }
}
exports.RefreshTokensService = RefreshTokensService;
//# sourceMappingURL=refresh-tokens.service.js.map