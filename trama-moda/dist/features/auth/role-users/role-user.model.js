"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUser = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class RoleUser extends sequelize_1.Model {
}
exports.RoleUser = RoleUser;
RoleUser.init({
    user_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    role_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "inactive",
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "RoleUser",
    tableName: "role_users",
    timestamps: true,
    indexes: [
        { name: "uq_role_users_user_role", unique: true, fields: ["user_id", "role_id"] },
        { name: "ix_role_users_user_id", fields: ["user_id"] },
        { name: "ix_role_users_role_id", fields: ["role_id"] },
    ],
});
//# sourceMappingURL=role-user.model.js.map