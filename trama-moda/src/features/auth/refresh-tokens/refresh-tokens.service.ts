import { randomUUID } from "node:crypto";
import { sequelize } from "../../../database/db";
import { AppError } from "../../../shared/errors/app-error";
import { generateOpaqueToken, sha256Hex } from "../../../shared/auth/password";
import { RefreshTokensRepository } from "./refresh-tokens.repository";
import { User } from "../users/user.model";

const repository = new RefreshTokensRepository();

export interface IssuedRefreshToken {
  refreshToken: string;
  refreshExpiresAt: Date;
  familyId: string;
}

function refreshExpiry(): Date {
  const ttlDays = Number(process.env.JWT_REFRESH_TTL_DAYS ?? 30);
  if (!Number.isInteger(ttlDays) || ttlDays < 1 || ttlDays > 365) {
    throw new AppError(500, "JWT_REFRESH_TTL_DAYS must be an integer between 1 and 365");
  }
  return new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);
}

export class RefreshTokensService {
  async issue(
    userId: number,
    deviceInfo?: string | null,
    familyId = randomUUID()
  ): Promise<IssuedRefreshToken> {
    const refreshToken = generateOpaqueToken();
    const refreshExpiresAt = refreshExpiry();
    const transaction = await sequelize.transaction();
    try {
      await repository.create(
        {
          user_id: userId,
          token_hash: sha256Hex(refreshToken),
          family_id: familyId,
          expires_at: refreshExpiresAt,
          device_info: deviceInfo?.slice(0, 500) ?? null,
        },
        transaction
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
    return { refreshToken, refreshExpiresAt, familyId };
  }

  async rotate(
    rawToken: string,
    deviceInfo?: string | null
  ): Promise<{ userId: number; issued: IssuedRefreshToken }> {
    if (!rawToken || rawToken.length > 512) {
      throw new AppError(401, "Invalid or expired refresh token");
    }

    const transaction = await sequelize.transaction();
    let result: { userId: number; issued: IssuedRefreshToken } | undefined;
    let invalid = false;
    try {
      const token = await repository.findByHashForUpdate(sha256Hex(rawToken), transaction);
      if (!token) {
        invalid = true;
      } else if (token.status !== "active" || token.expires_at.getTime() <= Date.now()) {
        await repository.revokeFamily(token.family_id, transaction);
        invalid = true;
      } else {
        const user = await User.findByPk(token.user_id, { transaction, lock: transaction.LOCK.UPDATE });
        if (!user || user.status !== "active") {
          await repository.revokeFamily(token.family_id, transaction);
          invalid = true;
        } else {
          await token.update({ status: "inactive" }, { transaction });
          const issued = await this.issueInTransaction(user.id, token.family_id, deviceInfo, transaction);
          result = { userId: user.id, issued };
        }
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

    if (invalid || !result) {
      throw new AppError(401, "Invalid or expired refresh token");
    }
    return result;
  }

  async revoke(rawToken: string): Promise<boolean> {
    if (!rawToken || rawToken.length > 512) return false;
    return repository.revokeByHash(sha256Hex(rawToken));
  }

  revokeAllForUser(userId: number): Promise<number> {
    return repository.revokeAllForUser(userId);
  }

  listForUser(userId: number): Promise<import("./refresh-token.model").RefreshToken[]> {
    return repository.listForUser(userId);
  }

  private async issueInTransaction(
    userId: number,
    familyId: string,
    deviceInfo: string | null | undefined,
    transaction: import("sequelize").Transaction
  ): Promise<IssuedRefreshToken> {
    const refreshToken = generateOpaqueToken();
    const refreshExpiresAt = refreshExpiry();
    await repository.create(
      {
        user_id: userId,
        token_hash: sha256Hex(refreshToken),
        family_id: familyId,
        expires_at: refreshExpiresAt,
        device_info: deviceInfo?.slice(0, 500) ?? null,
      },
      transaction
    );
    return { refreshToken, refreshExpiresAt, familyId };
  }
}
