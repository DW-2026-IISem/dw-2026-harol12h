export const createPromotionsTableMigration = {
  name: 'create-promotions-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE promotions (id, name, description, discountPercentage, startDate, endDate, active, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE promotions
  },
};
