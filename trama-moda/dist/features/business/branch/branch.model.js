"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Branch = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Branch extends sequelize_1.Model {
}
exports.Branch = Branch;
Branch.init({
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: db_1.sequelize,
    tableName: "branches",
    timestamps: true
});
//# sourceMappingURL=branch.model.js.map