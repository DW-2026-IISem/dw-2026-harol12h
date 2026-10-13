"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokensRepository = void 0;
const refresh_token_model_1 = require("./refresh-token.model");
class RefreshTokensRepository {
    findByHashForUpdate(tokenHash, transaction) {
        return refresh_token_model_1.RefreshToken.findOne({
            where: { token_hash: tokenHash },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });
    }
    create(input, transaction) {
        return refresh_token_model_1.RefreshToken.create({ ...input, status: "active" }, { transaction });
    }
    async revokeFamily(familyId, transaction) {
        await refresh_token_model_1.RefreshToken.update({ status: "inactive" }, { where: { family_id: familyId, status: "active" }, transaction });
    }
    async revokeByHash(tokenHash) {
        const [count] = await refresh_token_model_1.RefreshToken.update({ status: "inactive" }, { where: { token_hash: tokenHash, status: "active" } });
        return count > 0;
    }
    async revokeAllForUser(userId) {
        const [count] = await refresh_token_model_1.RefreshToken.update({ status: "inactive" }, { where: { user_id: userId, status: "active" } });
        return count;
    }
    listForUser(userId) {
        return refresh_token_model_1.RefreshToken.findAll({
            where: { user_id: userId },
            attributes: ["id", "family_id", "device_info", "expires_at", "status", "createdAt"],
            order: [["createdAt", "DESC"]],
        });
    }
}
exports.RefreshTokensRepository = RefreshTokensRepository;
//# sourceMappingURL=refresh-tokens.repository.js.map