"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
const client_model_1 = require("../client/client.model");
class Sale extends sequelize_1.Model {
}
exports.Sale = Sale;
Sale.init({
    client_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "clients",
            key: "id"
        }
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    monto_total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "active"
    }
}, {
    sequelize: db_1.sequelize,
    tableName: "sales",
    timestamps: true
});
// Relación entre Venta y Cliente
client_model_1.Client.hasMany(Sale, { foreignKey: "client_id", as: "sales" });
Sale.belongsTo(client_model_1.Client, { foreignKey: "client_id", as: "client" });
//# sourceMappingURL=sale.model.js.map