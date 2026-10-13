"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
const password_1 = require("../../../shared/auth/password");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    username: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false,
        unique: "uq_users_username",
        validate: {
            notEmpty: { msg: "Username cannot be empty" },
            len: { args: [3, 80], msg: "Username must be between 3 and 80 characters" },
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
        unique: "uq_users_email",
        validate: { isEmail: { msg: "Email must be a valid email address" } },
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: { notEmpty: { msg: "Password cannot be empty" } },
    },
    avatar: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "inactive",
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password)
                user.password = await (0, password_1.hashPassword)(user.password);
        },
        beforeUpdate: async (user) => {
            if (user.changed("password") && user.password) {
                user.password = await (0, password_1.hashPassword)(user.password);
            }
        },
        beforeBulkCreate: async (users) => {
            for (const user of users) {
                if (user.password)
                    user.password = await (0, password_1.hashPassword)(user.password);
            }
        },
        beforeValidate: (user) => {
            if (user.username)
                user.username = user.username.trim().toLowerCase();
            if (user.email)
                user.email = user.email.trim().toLowerCase();
        },
    },
});
//# sourceMappingURL=user.model.js.map