import { Transaction } from "sequelize";
import { RefreshToken } from "./refresh-token.model";

export class RefreshTokensRepository {
  findByHashForUpdate(tokenHash: string, transaction: Transaction): Promise<RefreshToken | null> {
    return RefreshToken.findOne({
      where: { token_hash: tokenHash },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
  }

  create(
    input: {
      user_id: number;
      token_hash: string;
      family_id: string;
      expires_at: Date;
      device_info: string | null;
    },
    transaction: Transaction
  ): Promise<RefreshToken> {
    return RefreshToken.create({ ...input, status: "active" }, { transaction });
  }

  async revokeFamily(familyId: string, transaction: Transaction): Promise<void> {
    await RefreshToken.update(
      { status: "inactive" },
      { where: { family_id: familyId, status: "active" }, transaction }
    );
  }

  async revokeByHash(tokenHash: string): Promise<boolean> {
    const [count] = await RefreshToken.update(
      { status: "inactive" },
      { where: { token_hash: tokenHash, status: "active" } }
    );
    return count > 0;
  }

  async revokeAllForUser(userId: number): Promise<number> {
    const [count] = await RefreshToken.update(
      { status: "inactive" },
      { where: { user_id: userId, status: "active" } }
    );
    return count;
  }

  listForUser(userId: number): Promise<RefreshToken[]> {
    return RefreshToken.findAll({
      where: { user_id: userId },
      attributes: ["id", "family_id", "device_info", "expires_at", "status", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
  }
}
