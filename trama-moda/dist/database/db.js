"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDatabase = exports.testConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConfigurations = {
    mysql: {
        dialect: "mysql",
        host: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
        username: process.env.MYSQL_USER || process.env.DB_USER || "root",
        password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "",
        database: process.env.MYSQL_NAME || process.env.DB_NAME || "trama-moda",
        port: parseInt(process.env.MYSQL_PORT || process.env.DB_PORT || "3306")
    }
};
const selectedEngine = process.env.DB_ENGINE || "mysql";
const selectedConfig = dbConfigurations[selectedEngine];
if (!selectedConfig) {
    throw new Error(`Motor de base de datos no soportado: ${selectedEngine}`);
}
exports.sequelize = new sequelize_1.Sequelize(selectedConfig.database, selectedConfig.username, selectedConfig.password, {
    host: selectedConfig.host,
    port: selectedConfig.port,
    dialect: selectedConfig.dialect,
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
});
const testConnection = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log(`✅ Conexión exitosa a ${selectedEngine.toUpperCase()}`);
        return true;
    }
    catch (error) {
        console.error(`❌ Error de conexión:`, error);
        return false;
    }
};
exports.testConnection = testConnection;
const syncDatabase = async (options = {}) => {
    const force = options.force === true;
    try {
        // Cargar Modelos de Negocio
        require("../features/business/user/user.model");
        require("../features/business/branch/branch.model");
        require("../features/business/client/client.model");
        require("../features/business/product/product.model");
        require("../features/business/sale/sale.model");
        require("../features/business/sale-detail/sale-detail.model");
        require("../features/business/catalog/collection.model");
        require("../features/business/variants/variant.model");
        require("../features/business/inventory/inventory.model");
        require("../features/business/category/category.model");
        require("../features/business/supplier/supplier.model");
        const { setupAssociations } = require("./associations");
        setupAssociations();
        // Cargar Modelos de Auth / RBAC
        require("../features/auth/users/user.model");
        require("../features/auth/roles/role.model");
        require("../features/auth/resources/resource.model");
        require("../features/auth/role-users/role-user.model");
        require("../features/auth/resource-roles/resource-role.model");
        require("../features/auth/refresh-tokens/refresh-token.model");
        require("../features/auth/rbac.associations");
        if (force) {
            await exports.sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
        }
        await exports.sequelize.sync({ force });
        const { Role } = require("../features/auth/roles/role.model");
        const { syncRbacResources } = require("./sync-rbac-resources");
        const activeRoles = await Role.findAll({ where: { status: "active" } });
        await syncRbacResources(activeRoles);
        console.log("✅ Tablas y relaciones (Business + Auth RBAC) sincronizadas correctamente en MySQL");
    }
    catch (error) {
        console.error("❌ Error al sincronizar las tablas:", error);
        throw error;
    }
    finally {
        if (force) {
            await exports.sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
        }
    }
};
exports.syncDatabase = syncDatabase;
//# sourceMappingURL=db.js.map