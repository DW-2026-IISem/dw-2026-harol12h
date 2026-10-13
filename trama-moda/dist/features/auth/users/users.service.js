"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const sequelize_1 = require("sequelize");
const users_repository_1 = require("./users.repository");
const repository = new users_repository_1.UsersRepository();
function normalized(input, field, maxLength) {
    if (typeof input !== "string")
        throw new app_error_1.AppError(400, `${field} is required`);
    const value = input.trim().toLowerCase();
    if (!value || value.length > maxLength)
        throw new app_error_1.AppError(400, `${field} is invalid`);
    return value;
}
function validateEmail(email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new app_error_1.AppError(400, "email must be a valid address");
    }
}
class UsersService {
    list() {
        return repository.findAll();
    }
    async get(id) {
        const user = await repository.findById(id);
        if (!user)
            throw new app_error_1.AppError(404, "Authentication account not found");
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async create(input) {
        const username = normalized(input.username, "username", 80);
        const email = normalized(input.email, "email", 150);
        const password = input.password;
        if (username.length < 3)
            throw new app_error_1.AppError(400, "username must contain at least 3 characters");
        validateEmail(email);
        if (typeof password !== "string" || password.length < 12) {
            throw new app_error_1.AppError(400, "password must contain at least 12 characters");
        }
        if (await repository.findByUsernameOrEmail(username, email)) {
            throw new app_error_1.AppError(409, "Username or email is already in use");
        }
        let user;
        try {
            user = await repository.create({ username, email, password });
        }
        catch (error) {
            if (error instanceof sequelize_1.UniqueConstraintError) {
                throw new app_error_1.AppError(409, "Username or email is already in use");
            }
            throw error;
        }
        return { id: user.id, username: user.username, email: user.email, status: user.status };
    }
    async update(id, input) {
        const user = await repository.findById(id);
        if (!user)
            throw new app_error_1.AppError(404, "Authentication account not found");
        const username = input.username === undefined ? user.username : normalized(input.username, "username", 80);
        const email = input.email === undefined ? user.email : normalized(input.email, "email", 150);
        if (username.length < 3)
            throw new app_error_1.AppError(400, "username must contain at least 3 characters");
        validateEmail(email);
        if (await repository.findByUsernameOrEmail(username, email, id)) {
            throw new app_error_1.AppError(409, "Username or email is already in use");
        }
        try {
            await user.update({ username, email });
        }
        catch (error) {
            if (error instanceof sequelize_1.UniqueConstraintError) {
                throw new app_error_1.AppError(409, "Username or email is already in use");
            }
            throw error;
        }
        return { id: user.id, username: user.username, email: user.email, status: user.status };
    }
    async changePassword(id, password) {
        if (typeof password !== "string" || password.length < 12) {
            throw new app_error_1.AppError(400, "password must contain at least 12 characters");
        }
        const user = await repository.findById(id);
        if (!user)
            throw new app_error_1.AppError(404, "Authentication account not found");
        await user.update({ password });
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map