import { QueryTypes } from "sequelize";
import { sequelize } from "../db";

interface ProductDescriptionColumn {
  DATA_TYPE: string;
  IS_NULLABLE: "YES" | "NO";
}

async function addProductDescription(): Promise<void> {
  try {
    await sequelize.authenticate();

    const columns = await sequelize.query<ProductDescriptionColumn>(
      `SELECT DATA_TYPE, IS_NULLABLE
       FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE()
         AND TABLE_NAME = :table
         AND COLUMN_NAME = :column`,
      {
        replacements: { table: "products", column: "descripcion" },
        type: QueryTypes.SELECT,
      },
    );

    if (columns.length === 0) {
      const productTable = await sequelize.query<{ TABLE_NAME: string }>(
        `SELECT TABLE_NAME
         FROM information_schema.TABLES
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table`,
        {
          replacements: { table: "products" },
          type: QueryTypes.SELECT,
        },
      );
      if (productTable.length === 0) {
        throw new Error(
          "No existe la tabla products en la base seleccionada; no se modificó el esquema.",
        );
      }

      await sequelize.query(
        "ALTER TABLE `products` ADD COLUMN `descripcion` TEXT NULL",
      );
      console.log("Columna nullable agregada: products.descripcion");
    } else if (
      columns[0].DATA_TYPE.toLowerCase() !== "text" ||
      columns[0].IS_NULLABLE !== "YES"
    ) {
      throw new Error(
        `products.descripcion ya existe como ${columns[0].DATA_TYPE} (nullable: ${columns[0].IS_NULLABLE}); se esperaba TEXT NULL. No se modificó la columna.`,
      );
    } else {
      console.log("products.descripcion ya existe como TEXT NULL; no se requieren cambios.");
    }

    const verifiedColumns = await sequelize.query<ProductDescriptionColumn>(
      `SELECT DATA_TYPE, IS_NULLABLE
       FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE()
         AND TABLE_NAME = :table
         AND COLUMN_NAME = :column`,
      {
        replacements: { table: "products", column: "descripcion" },
        type: QueryTypes.SELECT,
      },
    );
    if (
      verifiedColumns.length !== 1 ||
      verifiedColumns[0].DATA_TYPE.toLowerCase() !== "text" ||
      verifiedColumns[0].IS_NULLABLE !== "YES"
    ) {
      throw new Error(
        "La verificación de products.descripcion falló después de la migración.",
      );
    }

    console.log("Migración de products.descripcion completada y verificada.");
  } catch (error) {
    console.error("No se pudo completar la migración de products.descripcion:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

void addProductDescription();
