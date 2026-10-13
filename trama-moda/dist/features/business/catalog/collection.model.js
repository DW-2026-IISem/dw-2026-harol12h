"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Collection extends sequelize_1.Model {
}
exports.Collection = Collection;
Collection.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: db_1.sequelize,
    tableName: "collections",
    timestamps: true
});
//# sourceMappingURL=collection.model.js.map