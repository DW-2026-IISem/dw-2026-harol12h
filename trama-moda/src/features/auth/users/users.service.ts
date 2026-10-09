import { AppError } from "../../../shared/errors/app-error";
import { UniqueConstraintError } from "sequelize";
import { UsersRepository } from "./users.repository";
import { User } from "./user.model";

const repository = new UsersRepository();

function normalized(input: unknown, field: string, maxLength: number): string {
  if (typeof input !== "string") throw new AppError(400, `${field} is required`);
  const value = input.trim().toLowerCase();
  if (!value || value.length > maxLength) throw new AppError(400, `${field} is invalid`);
  return value;
}

function validateEmail(email: string): void {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError(400, "email must be a valid address");
  }
}

export class UsersService {
  list() {
    return repository.findAll();
  }

  async get(id: number) {
    const user = await repository.findById(id);
    if (!user) throw new AppError(404, "Authentication account not found");
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async create(input: { username?: unknown; email?: unknown; password?: unknown }) {
    const username = normalized(input.username, "username", 80);
    const email = normalized(input.email, "email", 150);
    const password = input.password;
    if (username.length < 3) throw new AppError(400, "username must contain at least 3 characters");
    validateEmail(email);
    if (typeof password !== "string" || password.length < 12) {
      throw new AppError(400, "password must contain at least 12 characters");
    }
    if (await repository.findByUsernameOrEmail(username, email)) {
      throw new AppError(409, "Username or email is already in use");
    }
    let user: User;
    try {
      user = await repository.create({ username, email, password });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new AppError(409, "Username or email is already in use");
      }
      throw error;
    }
    return { id: user.id, username: user.username, email: user.email, status: user.status };
  }

  async update(id: number, input: { username?: unknown; email?: unknown }) {
    const user = await repository.findById(id);
    if (!user) throw new AppError(404, "Authentication account not found");
    const username = input.username === undefined ? user.username : normalized(input.username, "username", 80);
    const email = input.email === undefined ? user.email : normalized(input.email, "email", 150);
    if (username.length < 3) throw new AppError(400, "username must contain at least 3 characters");
    validateEmail(email);
    if (await repository.findByUsernameOrEmail(username, email, id)) {
      throw new AppError(409, "Username or email is already in use");
    }
    try {
      await user.update({ username, email });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new AppError(409, "Username or email is already in use");
      }
      throw error;
    }
    return { id: user.id, username: user.username, email: user.email, status: user.status };
  }

  async changePassword(id: number, password: unknown): Promise<void> {
    if (typeof password !== "string" || password.length < 12) {
      throw new AppError(400, "password must contain at least 12 characters");
    }
    const user = await repository.findById(id);
    if (!user) throw new AppError(404, "Authentication account not found");
    await user.update({ password });
  }
}
