import { syncDatabase, sequelize } from "./db";
import { User } from "../features/auth/users/user.model";
import { Role } from "../features/auth/roles/role.model";
import { RoleUser } from "../features/auth/role-users/role-user.model";
import { syncRbacResources } from "./sync-rbac-resources";

async function initAdmin() {
  try {
    const username = process.env.ADMIN_USERNAME?.trim().toLowerCase();
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const configuredPassword = process.env.ADMIN_PASSWORD;
    if (!username || !email || !configuredPassword) {
      throw new Error("Define ADMIN_USERNAME, ADMIN_EMAIL y ADMIN_PASSWORD en .env.");
    }
    if (username.length < 3 || username.length > 80) {
      throw new Error("ADMIN_USERNAME debe tener entre 3 y 80 caracteres.");
    }
    if (configuredPassword.length < 12) {
      throw new Error("ADMIN_PASSWORD debe tener al menos 12 caracteres.");
    }

    console.log("🔄 Sincronizando tablas sin borrar los datos existentes...");
    await syncDatabase();

    console.log(`👤 Preparando usuario administrador ${username}...`);
    const [user] = await User.findOrCreate({
      where: { username },
      defaults: {
        username,
        email,
        password: configuredPassword,
        status: "active",
      },
    });
    await user.update({
      email,
      password: configuredPassword,
      status: "active",
    });

    const [role] = await Role.findOrCreate({
      where: { name: "ADMINISTRADOR" },
      defaults: {
        name: "ADMINISTRADOR",
        description: "Administrador general del sistema",
        status: "active",
      },
    });
    await role.update({ status: "active" });

    const [sellerRole] = await Role.findOrCreate({
      where: { name: "VENDEDOR" },
      defaults: {
        name: "VENDEDOR",
        description: "Acceso de vendedor a operaciones comerciales",
        status: "active",
      },
    });
    await sellerRole.update({ status: "active" });

    const [roleUser] = await RoleUser.findOrCreate({
      where: { user_id: user.id, role_id: role.id },
      defaults: {
        user_id: user.id,
        role_id: role.id,
        status: "active",
      },
    });
    await roleUser.update({ status: "active" });

    await syncRbacResources([role, sellerRole]);

    console.log(`✅ Usuario administrador '${username}' y permisos RBAC configurados correctamente.`);
  } catch (error) {
    console.error("❌ Error durante la inicialización:", error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

initAdmin();
