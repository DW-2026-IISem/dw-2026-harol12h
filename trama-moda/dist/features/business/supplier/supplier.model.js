"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Supplier extends sequelize_1.Model {
}
exports.Supplier = Supplier;
Supplier.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    contact_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: db_1.sequelize,
    tableName: "suppliers",
    timestamps: true
});
//# sourceMappingURL=supplier.model.js.map