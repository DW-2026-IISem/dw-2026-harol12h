"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Role extends sequelize_1.Model {
}
exports.Role = Role;
Role.init({
    name: {
        type: sequelize_1.DataTypes.STRING(80),
        allowNull: false,
        unique: "uq_roles_name",
        validate: { notEmpty: { msg: "Role name cannot be empty" } },
    },
    description: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "inactive",
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: true,
    hooks: {
        beforeValidate: (role) => {
            if (role.name)
                role.name = role.name.trim().toUpperCase();
        },
    },
});
//# sourceMappingURL=role.model.js.map