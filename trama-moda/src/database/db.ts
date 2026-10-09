import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

interface DatabaseConfig {
  dialect: string;
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
}

const dbConfigurations: Record<string, DatabaseConfig> = {
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

export const sequelize = new Sequelize(
  selectedConfig.database,
  selectedConfig.username,
  selectedConfig.password,
  {
    host: selectedConfig.host,
    port: selectedConfig.port,
    dialect: selectedConfig.dialect as any,
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
  }
);

export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Conexión exitosa a ${selectedEngine.toUpperCase()}`);
    return true;
  } catch (error) {
    console.error(`❌ Error de conexión:`, error);
    return false;
  }
};

export const syncDatabase = async (options: { force?: boolean } = {}): Promise<void> => {
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
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;");
    }
    await sequelize.sync({ force });

    const { Role } = require("../features/auth/roles/role.model");
    const { syncRbacResources } = require("./sync-rbac-resources");
    const activeRoles = await Role.findAll({ where: { status: "active" } });
    await syncRbacResources(activeRoles);

    console.log("✅ Tablas y relaciones (Business + Auth RBAC) sincronizadas correctamente en MySQL");
  } catch (error) {
    console.error("❌ Error al sincronizar las tablas:", error);
    throw error;
  } finally {
    if (force) {
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
    }
  }
};
