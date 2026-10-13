"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
const resource_match_1 = require("../../../shared/auth/resource-match");
class Resource extends sequelize_1.Model {
}
exports.Resource = Resource;
Resource.init({
    method: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        validate: {
            isIn: {
                args: [["GET", "POST", "PUT", "PATCH", "DELETE"]],
                msg: "Method must be one of GET, POST, PUT, PATCH, DELETE",
            },
        },
    },
    path: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: { notEmpty: { msg: "Path cannot be empty" } },
    },
    description: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "inactive",
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Resource",
    tableName: "resources",
    timestamps: true,
    indexes: [
        { name: "uq_resources_method_path", unique: true, fields: ["method", "path"] },
    ],
    hooks: {
        beforeValidate: (resource) => {
            if (resource.method)
                resource.method = resource.method.trim().toUpperCase();
            if (resource.path)
                resource.path = (0, resource_match_1.normalizePath)(resource.path.trim());
        },
    },
});
//# sourceMappingURL=resource.model.js.map