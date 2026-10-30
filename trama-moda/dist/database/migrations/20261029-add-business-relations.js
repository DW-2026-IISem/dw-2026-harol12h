"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const relations = [
    {
        table: "products",
        column: "category_id",
        targetTable: "categories",
        targetColumn: "id",
        constraint: "fk_products_category_id_categories",
        onDelete: "SET NULL",
    },
    {
        table: "products",
        column: "supplier_id",
        targetTable: "suppliers",
        targetColumn: "id",
        constraint: "fk_products_supplier_id_suppliers",
        onDelete: "SET NULL",
    },
    {
        table: "variants",
        column: "product_id",
        targetTable: "products",
        targetColumn: "id",
        constraint: "fk_variants_product_id_products",
        onDelete: "SET NULL",
    },
    {
        table: "inventories",
        column: "variantId",
        targetTable: "variants",
        targetColumn: "id",
        constraint: "fk_inventories_variantId_variants",
        onDelete: "RESTRICT",
    },
    {
        table: "inventories",
        column: "branchId",
        targetTable: "branches",
        targetColumn: "id",
        constraint: "fk_inventories_branchId_branches",
        onDelete: "RESTRICT",
    },
];
const quoteIdentifier = (identifier) => `\`${identifier.replace(/`/g, "``")}\``;
async function getColumns(table) {
    const columns = await db_1.sequelize.query(`SELECT COLUMN_NAME, DATA_TYPE, COLUMN_TYPE, IS_NULLABLE, COLUMN_KEY
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table`, { replacements: { table }, type: sequelize_1.QueryTypes.SELECT });
    return new Map(columns.map((column) => [column.COLUMN_NAME, column]));
}
async function getTable(table) {
    const tables = await db_1.sequelize.query(`SELECT TABLE_NAME, ENGINE
     FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :table`, { replacements: { table }, type: sequelize_1.QueryTypes.SELECT });
    return tables[0];
}
async function getForeignKey(relation) {
    const constraints = await db_1.sequelize.query(`SELECT kcu.CONSTRAINT_NAME, kcu.REFERENCED_TABLE_NAME,
            kcu.REFERENCED_COLUMN_NAME, rc.UPDATE_RULE, rc.DELETE_RULE
     FROM information_schema.KEY_COLUMN_USAGE AS kcu
     JOIN information_schema.REFERENTIAL_CONSTRAINTS AS rc
       ON rc.CONSTRAINT_SCHEMA = kcu.CONSTRAINT_SCHEMA
       AND rc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
       AND rc.TABLE_NAME = kcu.TABLE_NAME
     WHERE kcu.TABLE_SCHEMA = DATABASE()
       AND kcu.TABLE_NAME = :table
       AND kcu.COLUMN_NAME = :column
       AND kcu.REFERENCED_TABLE_NAME IS NOT NULL`, {
        replacements: { table: relation.table, column: relation.column },
        type: sequelize_1.QueryTypes.SELECT,
    });
    if (constraints.length > 1) {
        throw new Error(`${relation.table}.${relation.column} tiene varias claves foráneas; revisa el esquema antes de migrar.`);
    }
    return constraints[0];
}
function assertCompatibleInteger(relation, column, target) {
    const isUnsigned = (columnType) => /\bunsigned\b/i.test(columnType);
    if (column.DATA_TYPE.toLowerCase() !== "int" ||
        target.DATA_TYPE.toLowerCase() !== "int" ||
        column.DATA_TYPE.toLowerCase() !== target.DATA_TYPE.toLowerCase() ||
        isUnsigned(column.COLUMN_TYPE) !== isUnsigned(target.COLUMN_TYPE)) {
        throw new Error(`Tipos incompatibles en ${relation.table}.${relation.column} (${column.COLUMN_TYPE}) y ${relation.targetTable}.${relation.targetColumn} (${target.COLUMN_TYPE}). No se modificó esa relación.`);
    }
}
async function assertNoOrphans(relation) {
    const orphanRows = await db_1.sequelize.query(`SELECT COUNT(*) AS orphanCount
     FROM ${quoteIdentifier(relation.table)} AS child
     LEFT JOIN ${quoteIdentifier(relation.targetTable)} AS parent
       ON child.${quoteIdentifier(relation.column)} = parent.${quoteIdentifier(relation.targetColumn)}
     WHERE child.${quoteIdentifier(relation.column)} IS NOT NULL
       AND parent.${quoteIdentifier(relation.targetColumn)} IS NULL`, { type: sequelize_1.QueryTypes.SELECT });
    const orphanCount = Number(orphanRows[0]?.orphanCount ?? 0);
    if (orphanCount > 0) {
        throw new Error(`No se puede crear ${relation.table}.${relation.column} → ${relation.targetTable}.${relation.targetColumn}: hay ${orphanCount} registro(s) huérfano(s). No se eliminaron ni modificaron datos.`);
    }
}
async function migrateRelations() {
    try {
        await db_1.sequelize.authenticate();
        const tableNames = [...new Set(relations.flatMap((relation) => [
                relation.table,
                relation.targetTable,
            ]))];
        const columnsByTable = new Map();
        for (const table of tableNames) {
            const tableInfo = await getTable(table);
            if (!tableInfo) {
                throw new Error(`No existe la tabla ${table} en la base seleccionada. No se realizó ningún cambio.`);
            }
            if (tableInfo.ENGINE?.toUpperCase() !== "INNODB") {
                throw new Error(`La tabla ${table} usa ${tableInfo.ENGINE ?? "un motor desconocido"}; se requiere InnoDB para claves foráneas. No se realizó ningún cambio.`);
            }
            const columns = await getColumns(table);
            if (columns.size === 0) {
                throw new Error(`No existe la tabla ${table} en la base seleccionada. No se realizó ningún cambio.`);
            }
            columnsByTable.set(table, columns);
        }
        const existingForeignKeys = new Map();
        for (const relation of relations) {
            const parentColumns = columnsByTable.get(relation.targetTable);
            const target = parentColumns.get(relation.targetColumn);
            if (!target) {
                throw new Error(`No existe ${relation.targetTable}.${relation.targetColumn}. No se realizó ningún cambio.`);
            }
            if (target.COLUMN_KEY !== "PRI") {
                throw new Error(`${relation.targetTable}.${relation.targetColumn} debe ser clave primaria para esta relación. No se realizó ningún cambio.`);
            }
            const childColumns = columnsByTable.get(relation.table);
            const child = childColumns.get(relation.column);
            if (child) {
                assertCompatibleInteger(relation, child, target);
                if (relation.onDelete === "SET NULL" && child.IS_NULLABLE !== "YES") {
                    throw new Error(`${relation.table}.${relation.column} debe permitir NULL para usar ON DELETE SET NULL. No se realizó ningún cambio.`);
                }
                await assertNoOrphans(relation);
            }
            else if (target.DATA_TYPE.toLowerCase() !== "int" ||
                /\bunsigned\b/i.test(target.COLUMN_TYPE)) {
                throw new Error(`No se puede agregar ${relation.table}.${relation.column}: el id de ${relation.targetTable} no es INTEGER firmado, compatible con el modelo Sequelize. No se realizó ningún cambio.`);
            }
            const foreignKey = child ? await getForeignKey(relation) : undefined;
            if (foreignKey &&
                (foreignKey.REFERENCED_TABLE_NAME !== relation.targetTable ||
                    foreignKey.REFERENCED_COLUMN_NAME !== relation.targetColumn ||
                    foreignKey.UPDATE_RULE.toUpperCase() !== "CASCADE" ||
                    foreignKey.DELETE_RULE.toUpperCase() !== relation.onDelete)) {
                throw new Error(`${relation.table}.${relation.column} ya tiene una clave foránea (${foreignKey.CONSTRAINT_NAME}) con destino o reglas diferentes. No se reemplazó.`);
            }
            existingForeignKeys.set(`${relation.table}.${relation.column}`, foreignKey);
        }
        for (const relation of relations) {
            const columns = columnsByTable.get(relation.table);
            if (!columns.has(relation.column)) {
                await db_1.sequelize.query(`ALTER TABLE ${quoteIdentifier(relation.table)}
           ADD COLUMN ${quoteIdentifier(relation.column)} INTEGER NULL`);
                console.log(`Columna nullable agregada: ${relation.table}.${relation.column}`);
            }
        }
        for (const relation of relations) {
            await assertNoOrphans(relation);
            if (!existingForeignKeys.get(`${relation.table}.${relation.column}`)) {
                await db_1.sequelize.query(`ALTER TABLE ${quoteIdentifier(relation.table)}
           ADD CONSTRAINT ${quoteIdentifier(relation.constraint)}
           FOREIGN KEY (${quoteIdentifier(relation.column)})
           REFERENCES ${quoteIdentifier(relation.targetTable)} (${quoteIdentifier(relation.targetColumn)})
           ON UPDATE CASCADE ON DELETE ${relation.onDelete}`);
                console.log(`Clave foránea agregada: ${relation.table}.${relation.column}`);
            }
        }
        console.log("Migración de relaciones completada y verificada.");
    }
    catch (error) {
        console.error("No se pudo completar la migración de relaciones:", error);
        process.exitCode = 1;
    }
    finally {
        await db_1.sequelize.close();
    }
}
void migrateRelations();
//# sourceMappingURL=20261029-add-business-relations.js.map