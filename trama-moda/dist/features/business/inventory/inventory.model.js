"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Inventory extends sequelize_1.Model {
}
exports.Inventory = Inventory;
Inventory.init({
    branchId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "branches", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
    },
    variantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "variants", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: db_1.sequelize,
    tableName: "inventories",
    timestamps: true
});
//# sourceMappingURL=inventory.model.js.map