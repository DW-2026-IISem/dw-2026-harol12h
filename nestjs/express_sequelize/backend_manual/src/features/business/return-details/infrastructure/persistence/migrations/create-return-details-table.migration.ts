export const createReturnDetailsTableMigration = {
  name: 'create-return-details-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE return_details (id, returnId, productId, quantity, reason, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE return_details
  },
};
