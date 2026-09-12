export const createCollectionsTableMigration = {
  name: 'create-collections-table',
  async up(): Promise<void> {
    // Sequelize sync handles table creation in development.
    // Production: CREATE TABLE collections (id, name, description, isActive, createdAt, updatedAt)
  },
  async down(): Promise<void> {
    // Production: DROP TABLE collections
  },
};
