import { AppError } from "../../../shared/errors/app-error";
import { signAccessToken } from "../../../shared/auth/jwt";
import { verifyPassword } from "../../../shared/auth/password";
import { ResourceRolesRepository } from "../resource-roles/resource-roles.repository";
import { UsersRepository } from "../users/users.repository";
import { RefreshTokensService } from "../refresh-tokens/refresh-tokens.service";
import { SessionResponseDto } from "./dto";

const users = new UsersRepository();
const refreshTokens = new RefreshTokensService();
const resourceRoles = new ResourceRolesRepository();

export class SessionService {
  async login(username: string, password: string, deviceInfo?: string): Promise<SessionResponseDto> {
    if (typeof username !== "string" || typeof password !== "string" || !username || !password) {
      throw new AppError(400, "username and password are required");
    }
    const user = await users.findByUsername(username);
    if (!user || user.status !== "active" || !(await verifyPassword(password, user.password))) {
      throw new AppError(401, "Invalid credentials");
    }

    const access = signAccessToken({ id: user.id, username: user.username });
    const refresh = await refreshTokens.issue(user.id, deviceInfo);
    return {
      accessToken: access.token,
      refreshToken: refresh.refreshToken,
      expiresIn: access.expiresIn,
      refreshExpiresAt: refresh.refreshExpiresAt,
      tokenType: "Bearer",
    };
  }

  async refresh(rawToken: string, deviceInfo?: string): Promise<SessionResponseDto> {
    const { userId, issued } = await refreshTokens.rotate(rawToken, deviceInfo);
    const user = await users.findById(userId);
    if (!user || user.status !== "active") {
      await refreshTokens.revokeAllForUser(userId);
      throw new AppError(401, "User is not active");
    }
    const access = signAccessToken({ id: user.id, username: user.username });
    return {
      accessToken: access.token,
      refreshToken: issued.refreshToken,
      expiresIn: access.expiresIn,
      refreshExpiresAt: issued.refreshExpiresAt,
      tokenType: "Bearer",
    };
  }

  async logout(rawToken: string): Promise<void> {
    if (typeof rawToken !== "string" || !rawToken) {
      throw new AppError(400, "refreshToken is required");
    }
    await refreshTokens.revoke(rawToken);
  }

  async profile(userId: number): Promise<Record<string, unknown>> {
    const user = await users.findById(userId);
    if (!user || user.status !== "active") throw new AppError(404, "User not found");
    return { id: user.id, username: user.username, email: user.email, status: user.status };
  }

  myPermissions(userId: number): Promise<Array<{ method: string; path: string }>> {
    return resourceRoles.findEffectiveForUser(userId);
  }

  mySessions(userId: number) {
    return refreshTokens.listForUser(userId);
  }

  revokeMySessions(userId: number): Promise<number> {
    return refreshTokens.revokeAllForUser(userId);
  }
}
