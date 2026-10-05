import { sequelize } from "./db";
import { User } from "../features/business/user/user.model";

async function seed() {
  try {
    await sequelize.authenticate();
    const adminExists = await User.findOne({ where: { email: "admin@tramamoda.com" } });
    
    if (!adminExists) {
      await User.create({
        name: "Admin Principal",
        email: "admin@tramamoda.com",
        password: "AdminPassword123!",
        role: "admin",
        is_active: true
      });
      console.log("✅ Usuario Admin creado: admin@tramamoda.com / AdminPassword123!");
    } else {
      console.log("ℹ️ El usuario admin ya existe.");
    }
  } catch (error) {
    console.error("❌ Error en el seeder:", error);
  } finally {
    process.exit();
  }
}

seed();
