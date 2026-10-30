# Relaciones de la base de datos

Las relaciones de categorías, proveedores, productos, variantes, inventarios y sucursales se declaran en los modelos Sequelize y se registran en `src/database/associations.ts`.

El arranque del servidor usa `sequelize.sync()` sin `force` ni `alter`. Eso conserva tablas existentes, pero no actualiza físicamente una tabla antigua. Para crear las columnas y claves foráneas de esta tarea, ejecuta explícitamente desde la raíz del proyecto:

```bash
npm run db:migrate:relations
```

La migración es idempotente: verifica tablas, tipos, reglas de claves foráneas y registros huérfanos antes de modificar el esquema. Las columnas nuevas son `NULL`; los registros actuales se conservan. Si encuentra datos huérfanos, tipos incompatibles o una clave foránea con reglas diferentes, se detiene y explica el problema. No elimina ni corrige filas automáticamente. Como toda migración DDL de MySQL, conviene realizarla con una copia de seguridad reciente y sin escrituras concurrentes.

No ejecutes `npm run seed` para aplicar esta migración. El seed solo inserta datos de ejemplo y no es necesario para crear las relaciones.

## Comprobación en DBeaver

1. Conecta DBeaver a la misma instancia y esquema indicados por `DB_ENGINE`, `MYSQL_HOST`/`DB_HOST` y `MYSQL_NAME`/`DB_NAME` en la configuración local.
2. Abre un SQL Editor sobre ese esquema y confirma la base seleccionada:

   ```sql
   SELECT DATABASE();
   ```

3. Después de ejecutar `npm run db:migrate:relations`, consulta las columnas y reglas de las claves foráneas:

   ```sql
   SELECT
     kcu.TABLE_NAME,
     kcu.COLUMN_NAME,
     kcu.REFERENCED_TABLE_NAME,
     kcu.REFERENCED_COLUMN_NAME,
     rc.UPDATE_RULE,
     rc.DELETE_RULE
   FROM information_schema.KEY_COLUMN_USAGE AS kcu
   JOIN information_schema.REFERENTIAL_CONSTRAINTS AS rc
     ON rc.CONSTRAINT_SCHEMA = kcu.CONSTRAINT_SCHEMA
     AND rc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
     AND rc.TABLE_NAME = kcu.TABLE_NAME
   WHERE kcu.TABLE_SCHEMA = DATABASE()
     AND (
       (kcu.TABLE_NAME = 'products' AND kcu.COLUMN_NAME IN ('category_id', 'supplier_id'))
       OR (kcu.TABLE_NAME = 'variants' AND kcu.COLUMN_NAME = 'product_id')
       OR (kcu.TABLE_NAME = 'inventories' AND kcu.COLUMN_NAME IN ('variantId', 'branchId'))
     )
     AND kcu.REFERENCED_TABLE_NAME IS NOT NULL
   ORDER BY kcu.TABLE_NAME, kcu.COLUMN_NAME;
   ```

   Deben aparecer cinco filas. Todas deben tener `UPDATE_RULE = CASCADE`; productos y variantes deben tener `DELETE_RULE = SET NULL`, e inventarios `DELETE_RULE = RESTRICT`.

4. Comprueba también las columnas con **Database Navigator → esquema → Tables → tabla → Columns**. `products.category_id`, `products.supplier_id` y `variants.product_id` deben admitir `NULL`; inventarios conserva `branchId` y `variantId`.
5. Si quieres verificar la ausencia de huérfanos manualmente:

   ```sql
   SELECT 'products.category_id' AS relation_name, COUNT(*) AS orphan_count
   FROM products c LEFT JOIN categories p ON c.category_id = p.id
   WHERE c.category_id IS NOT NULL AND p.id IS NULL
   UNION ALL
   SELECT 'products.supplier_id', COUNT(*)
   FROM products c LEFT JOIN suppliers p ON c.supplier_id = p.id
   WHERE c.supplier_id IS NOT NULL AND p.id IS NULL
   UNION ALL
   SELECT 'variants.product_id', COUNT(*)
   FROM variants c LEFT JOIN products p ON c.product_id = p.id
   WHERE c.product_id IS NOT NULL AND p.id IS NULL
   UNION ALL
   SELECT 'inventories.variantId', COUNT(*)
   FROM inventories c LEFT JOIN variants p ON c.variantId = p.id
   WHERE c.variantId IS NOT NULL AND p.id IS NULL
   UNION ALL
   SELECT 'inventories.branchId', COUNT(*)
   FROM inventories c LEFT JOIN branches p ON c.branchId = p.id
   WHERE c.branchId IS NOT NULL AND p.id IS NULL;
   ```

   Todas las filas deben mostrar `orphan_count = 0`.
