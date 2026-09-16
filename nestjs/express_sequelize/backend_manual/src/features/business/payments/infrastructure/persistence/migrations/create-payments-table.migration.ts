export const createPaymentsTableMigration = {
  name: 'create-payments-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE payments (id, orderId, method, amount, status, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE payments
  },
};
