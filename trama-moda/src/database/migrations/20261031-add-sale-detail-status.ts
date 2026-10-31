import { QueryTypes } from "sequelize";
import { sequelize } from "../db";

interface ColumnInfo {
  COLUMN_NAME: string;
}

async function addSaleDetailStatus(): Promise<void> {
  try {
    await sequelize.authenticate();
    const columns = await sequelize.query<ColumnInfo>(
      `SELECT COLUMN_NAME
       FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE()
         AND TABLE_NAME = 'sale_details'
         AND COLUMN_NAME = 'status'`,
      { type: QueryTypes.SELECT },
    );

    if (columns.length === 0) {
      await sequelize.query(
        `ALTER TABLE \`sale_details\`
         ADD COLUMN \`status\` ENUM('active', 'inactive') NOT NULL DEFAULT 'active'`,
      );
    }

    await sequelize.query(
      `UPDATE \`sale_details\`
       SET \`status\` = 'active'
       WHERE \`status\` IS NULL`,
    );
    console.log("Estado lógico de detalles de venta verificado.");
  } catch (error) {
    console.error("No se pudo agregar el estado de detalles de venta:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

void addSaleDetailStatus();
