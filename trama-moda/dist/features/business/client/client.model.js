"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Client extends sequelize_1.Model {
}
exports.Client = Client;
Client.init({
    tipo_documento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    numero_documento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "active"
    }
}, {
    sequelize: db_1.sequelize,
    tableName: "clients",
    timestamps: true
});
//# sourceMappingURL=client.model.js.map