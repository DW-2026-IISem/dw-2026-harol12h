export const createOrdersTableMigration = {
  name: 'create-orders-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE orders (id, clientId, orderDate, status, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE orders
  },
};
