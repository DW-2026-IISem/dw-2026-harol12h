"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const user_model_1 = require("../features/auth/users/user.model");
const role_model_1 = require("../features/auth/roles/role.model");
const role_user_model_1 = require("../features/auth/role-users/role-user.model");
const sync_rbac_resources_1 = require("./sync-rbac-resources");
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
        await (0, db_1.syncDatabase)();
        console.log(`👤 Preparando usuario administrador ${username}...`);
        const [user] = await user_model_1.User.findOrCreate({
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
        const [role] = await role_model_1.Role.findOrCreate({
            where: { name: "ADMINISTRADOR" },
            defaults: {
                name: "ADMINISTRADOR",
                description: "Administrador general del sistema",
                status: "active",
            },
        });
        await role.update({ status: "active" });
        const [sellerRole] = await role_model_1.Role.findOrCreate({
            where: { name: "VENDEDOR" },
            defaults: {
                name: "VENDEDOR",
                description: "Acceso de vendedor a operaciones comerciales",
                status: "active",
            },
        });
        await sellerRole.update({ status: "active" });
        const [roleUser] = await role_user_model_1.RoleUser.findOrCreate({
            where: { user_id: user.id, role_id: role.id },
            defaults: {
                user_id: user.id,
                role_id: role.id,
                status: "active",
            },
        });
        await roleUser.update({ status: "active" });
        await (0, sync_rbac_resources_1.syncRbacResources)([role, sellerRole]);
        console.log(`✅ Usuario administrador '${username}' y permisos RBAC configurados correctamente.`);
    }
    catch (error) {
        console.error("❌ Error durante la inicialización:", error);
        process.exitCode = 1;
    }
    finally {
        await db_1.sequelize.close();
    }
}
initAdmin();
//# sourceMappingURL=init-admin.js.map