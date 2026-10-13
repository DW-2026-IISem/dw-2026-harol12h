"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
        unique: true,
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20),
        defaultValue: "active",
    },
}, {
    sequelize: db_1.sequelize,
    tableName: "business_users",
    timestamps: true,
});
//# sourceMappingURL=user.model.js.map