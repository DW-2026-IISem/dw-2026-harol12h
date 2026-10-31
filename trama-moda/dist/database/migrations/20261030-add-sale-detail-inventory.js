"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const relations = [
    {
        column: "variantId",
        targetTable: "variants",
        constraint: "fk_sale_details_variantId_variants",
    },
    {
        column: "branchId",
        targetTable: "branches",
        constraint: "fk_sale_details_branchId_branches",
    },
];
async function getTable(table) {
    const rows = await db_1.sequelize.query(`SELECT TABLE_NAME, ENGINE
     FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table`, { replacements: { table }, type: sequelize_1.QueryTypes.SELECT });
    return rows[0];
}
async function getColumn(table, column) {
    const rows = await db_1.sequelize.query(`SELECT COLUMN_NAME, DATA_TYPE, COLUMN_TYPE, IS_NULLABLE
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = :table
       AND COLUMN_NAME = :column`, { replacements: { table, column }, type: sequelize_1.QueryTypes.SELECT });
    return rows[0];
}
async function getForeignKey(column) {
    const rows = await db_1.sequelize.query(`SELECT kcu.CONSTRAINT_NAME, kcu.REFERENCED_TABLE_NAME,
            kcu.REFERENCED_COLUMN_NAME, rc.UPDATE_RULE, rc.DELETE_RULE
     FROM information_schema.KEY_COLUMN_USAGE AS kcu
     JOIN information_schema.REFERENTIAL_CONSTRAINTS AS rc
       ON rc.CONSTRAINT_SCHEMA = kcu.CONSTRAINT_SCHEMA
       AND rc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
       AND rc.TABLE_NAME = kcu.TABLE_NAME
     WHERE kcu.TABLE_SCHEMA = DATABASE()
       AND kcu.TABLE_NAME = :table
       AND kcu.COLUMN_NAME = :column
       AND kcu.REFERENCED_TABLE_NAME IS NOT NULL`, { replacements: { table: "sale_details", column }, type: sequelize_1.QueryTypes.SELECT });
    if (rows.length > 1) {
        throw new Error(`sale_details.${column} tiene varias claves foráneas. Revisa el esquema antes de migrar.`);
    }
    return rows[0];
}
async function assertNoOrphans(relation) {
    const rows = await db_1.sequelize.query(`SELECT COUNT(*) AS orphanCount
     FROM sale_details AS detail
     LEFT JOIN \`${relation.targetTable}\` AS parent
       ON detail.\`${relation.column}\` = parent.id
     WHERE detail.\`${relation.column}\` IS NOT NULL
       AND parent.id IS NULL`, { type: sequelize_1.QueryTypes.SELECT });
    if (Number(rows[0]?.orphanCount ?? 0) > 0) {
        throw new Error(`sale_details.${relation.column} contiene registros huérfanos. No se modificaron datos.`);
    }
}
async function migrateSaleDetailInventory() {
    try {
        await db_1.sequelize.authenticate();
        for (const table of ["sale_details", "variants", "branches"]) {
            const tableInfo = await getTable(table);
            if (!tableInfo) {
                throw new Error(`No existe la tabla ${table} en la base seleccionada. No se modificó el esquema.`);
            }
            if (tableInfo.ENGINE?.toUpperCase() !== "INNODB") {
                throw new Error(`La tabla ${table} requiere motor InnoDB para claves foráneas.`);
            }
        }
        const plannedForeignKeys = new Map();
        for (const relation of relations) {
            const target = await getColumn(relation.targetTable, "id");
            if (!target ||
                target.DATA_TYPE.toLowerCase() !== "int" ||
                /\bunsigned\b/i.test(target.COLUMN_TYPE)) {
                throw new Error(`${relation.targetTable}.id debe ser INTEGER firmado para asociarlo con sale_details.${relation.column}.`);
            }
            const column = await getColumn("sale_details", relation.column);
            if (column) {
                if (column.DATA_TYPE.toLowerCase() !== "int" ||
                    /\bunsigned\b/i.test(column.COLUMN_TYPE) ||
                    column.IS_NULLABLE !== "YES") {
                    throw new Error(`sale_details.${relation.column} debe ser INTEGER firmado y nullable; se encontró ${column.COLUMN_TYPE} (nullable: ${column.IS_NULLABLE}).`);
                }
                await assertNoOrphans(relation);
            }
            const foreignKey = column ? await getForeignKey(relation.column) : undefined;
            if (foreignKey &&
                (foreignKey.REFERENCED_TABLE_NAME !== relation.targetTable ||
                    foreignKey.REFERENCED_COLUMN_NAME !== "id" ||
                    foreignKey.UPDATE_RULE.toUpperCase() !== "CASCADE" ||
                    foreignKey.DELETE_RULE.toUpperCase() !== "RESTRICT")) {
                throw new Error(`sale_details.${relation.column} ya tiene una clave foránea con destino o reglas incompatibles.`);
            }
            plannedForeignKeys.set(relation.column, foreignKey);
        }
        for (const relation of relations) {
            if (!(await getColumn("sale_details", relation.column))) {
                await db_1.sequelize.query(`ALTER TABLE \`sale_details\` ADD COLUMN \`${relation.column}\` INTEGER NULL`);
                console.log(`Columna nullable agregada: sale_details.${relation.column}`);
            }
        }
        for (const relation of relations) {
            await assertNoOrphans(relation);
            if (!plannedForeignKeys.get(relation.column)) {
                await db_1.sequelize.query(`ALTER TABLE \`sale_details\`
           ADD CONSTRAINT \`${relation.constraint}\`
           FOREIGN KEY (\`${relation.column}\`)
           REFERENCES \`${relation.targetTable}\` (\`id\`)
           ON UPDATE CASCADE ON DELETE RESTRICT`);
                console.log(`Clave foránea agregada: sale_details.${relation.column}`);
            }
        }
        console.log("Migración de inventario por línea de venta completada.");
    }
    catch (error) {
        console.error("No se pudo completar la migración de líneas de venta:", error);
        process.exitCode = 1;
    }
    finally {
        await db_1.sequelize.close();
    }
}
void migrateSaleDetailInventory();
//# sourceMappingURL=20261030-add-sale-detail-inventory.js.map