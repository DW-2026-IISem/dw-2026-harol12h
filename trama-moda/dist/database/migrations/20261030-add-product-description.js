"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
async function addProductDescription() {
    try {
        await db_1.sequelize.authenticate();
        const columns = await db_1.sequelize.query(`SELECT DATA_TYPE, IS_NULLABLE
       FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE()
         AND TABLE_NAME = :table
         AND COLUMN_NAME = :column`, {
            replacements: { table: "products", column: "descripcion" },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (columns.length === 0) {
            const productTable = await db_1.sequelize.query(`SELECT TABLE_NAME
         FROM information_schema.TABLES
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table`, {
                replacements: { table: "products" },
                type: sequelize_1.QueryTypes.SELECT,
            });
            if (productTable.length === 0) {
                throw new Error("No existe la tabla products en la base seleccionada; no se modificó el esquema.");
            }
            await db_1.sequelize.query("ALTER TABLE `products` ADD COLUMN `descripcion` TEXT NULL");
            console.log("Columna nullable agregada: products.descripcion");
        }
        else if (columns[0].DATA_TYPE.toLowerCase() !== "text" ||
            columns[0].IS_NULLABLE !== "YES") {
            throw new Error(`products.descripcion ya existe como ${columns[0].DATA_TYPE} (nullable: ${columns[0].IS_NULLABLE}); se esperaba TEXT NULL. No se modificó la columna.`);
        }
        else {
            console.log("products.descripcion ya existe como TEXT NULL; no se requieren cambios.");
        }
        const verifiedColumns = await db_1.sequelize.query(`SELECT DATA_TYPE, IS_NULLABLE
       FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE()
         AND TABLE_NAME = :table
         AND COLUMN_NAME = :column`, {
            replacements: { table: "products", column: "descripcion" },
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (verifiedColumns.length !== 1 ||
            verifiedColumns[0].DATA_TYPE.toLowerCase() !== "text" ||
            verifiedColumns[0].IS_NULLABLE !== "YES") {
            throw new Error("La verificación de products.descripcion falló después de la migración.");
        }
        console.log("Migración de products.descripcion completada y verificada.");
    }
    catch (error) {
        console.error("No se pudo completar la migración de products.descripcion:", error);
        process.exitCode = 1;
    }
    finally {
        await db_1.sequelize.close();
    }
}
void addProductDescription();
//# sourceMappingURL=20261030-add-product-description.js.map