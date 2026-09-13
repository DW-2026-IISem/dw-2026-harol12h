export const createProductsTableMigration = {
  name: 'create-products-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE products (...)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE products
  },
};
