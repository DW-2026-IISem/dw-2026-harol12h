export const createReturnsTableMigration = {
  name: 'create-returns-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE returns (id, orderId, date, reason, total, status, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE returns
  },
};
