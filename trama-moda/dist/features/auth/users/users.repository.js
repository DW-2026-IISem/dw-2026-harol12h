"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const user_model_1 = require("./user.model");
const sequelize_1 = require("sequelize");
class UsersRepository {
    async findAll() {
        return user_model_1.User.findAll({
            attributes: ["id", "username", "email", "status", "createdAt", "updatedAt"],
            order: [["id", "ASC"]],
        });
    }
    async findById(id) {
        return user_model_1.User.findByPk(id);
    }
    async findByUsernameOrEmail(username, email, excludeId) {
        return user_model_1.User.findOne({
            where: {
                [sequelize_1.Op.or]: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
                ...(excludeId ? { id: { [sequelize_1.Op.ne]: excludeId } } : {}),
            },
            attributes: ["id", "username", "email"],
        });
    }
    async findByUsername(username) {
        return user_model_1.User.findOne({ where: { username: username.toLowerCase() } });
    }
    async findByEmail(email) {
        return user_model_1.User.findOne({ where: { email: email.toLowerCase() } });
    }
    async create(input) {
        return user_model_1.User.create({ ...input, status: "active" });
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map