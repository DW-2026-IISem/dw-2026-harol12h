"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleDetail = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
const sale_model_1 = require("../sale/sale.model");
const product_model_1 = require("../product/product.model");
class SaleDetail extends sequelize_1.Model {
}
exports.SaleDetail = SaleDetail;
SaleDetail.init({
    sale_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "sales",
            key: "id"
        }
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: "id"
        }
    },
    variantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: "variants", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
    },
    branchId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: "branches", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    precio_unitario: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active"
    }
}, {
    sequelize: db_1.sequelize,
    tableName: "sale_details",
    timestamps: true
});
// Definición de Relaciones
sale_model_1.Sale.hasMany(SaleDetail, { foreignKey: "sale_id", as: "details" });
SaleDetail.belongsTo(sale_model_1.Sale, { foreignKey: "sale_id", as: "sale" });
product_model_1.Product.hasMany(SaleDetail, { foreignKey: "product_id", as: "sale_details" });
SaleDetail.belongsTo(product_model_1.Product, { foreignKey: "product_id", as: "product" });
//# sourceMappingURL=sale-detail.model.js.map