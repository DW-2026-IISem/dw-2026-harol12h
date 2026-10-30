"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    precio: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: "categories", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    supplier_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: "suppliers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "active"
    }
}, {
    sequelize: db_1.sequelize,
    tableName: "products",
    timestamps: true
});
//# sourceMappingURL=product.model.js.map