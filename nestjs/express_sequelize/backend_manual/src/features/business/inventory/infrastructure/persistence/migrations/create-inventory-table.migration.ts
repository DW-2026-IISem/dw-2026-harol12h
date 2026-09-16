export const createInventoryTableMigration = {
  name: 'create-inventory-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE inventory (id, branchId, variantId, quantity, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE inventory
  },
};
