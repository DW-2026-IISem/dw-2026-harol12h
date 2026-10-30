"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Variant extends sequelize_1.Model {
}
exports.Variant = Variant;
Variant.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: "products", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: db_1.sequelize,
    tableName: "variants",
    timestamps: true
});
//# sourceMappingURL=variant.model.js.map