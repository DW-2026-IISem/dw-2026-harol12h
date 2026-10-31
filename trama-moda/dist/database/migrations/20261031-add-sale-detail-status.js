"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
async function addSaleDetailStatus() {
    try {
        await db_1.sequelize.authenticate();
        const columns = await db_1.sequelize.query(`SELECT COLUMN_NAME
       FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE()
         AND TABLE_NAME = 'sale_details'
         AND COLUMN_NAME = 'status'`, { type: sequelize_1.QueryTypes.SELECT });
        if (columns.length === 0) {
            await db_1.sequelize.query(`ALTER TABLE \`sale_details\`
         ADD COLUMN \`status\` ENUM('active', 'inactive') NOT NULL DEFAULT 'active'`);
        }
        await db_1.sequelize.query(`UPDATE \`sale_details\`
       SET \`status\` = 'active'
       WHERE \`status\` IS NULL`);
        console.log("Estado lógico de detalles de venta verificado.");
    }
    catch (error) {
        console.error("No se pudo agregar el estado de detalles de venta:", error);
        process.exitCode = 1;
    }
    finally {
        await db_1.sequelize.close();
    }
}
void addSaleDetailStatus();
//# sourceMappingURL=20261031-add-sale-detail-status.js.map