import { sequelize } from "../db";
import { Resource } from "../../features/auth/resources/resource.model";
import { ResourceRole } from "../../features/auth/resource-roles/resource-role.model";
import { Role } from "../../features/auth/roles/role.model";
import { RoleUser } from "../../features/auth/role-users/role-user.model";
import { User } from "../../features/auth/users/user.model";
import "../../features/auth/rbac.associations";

async function seedAuthTestAccount(): Promise<void> {
  const username = process.env.AUTH_TEST_USERNAME?.trim().toLowerCase();
  const email = process.env.AUTH_TEST_EMAIL?.trim().toLowerCase();
  const password = process.env.AUTH_TEST_PASSWORD;

  if (!username || !email || !password) {
    throw new Error(
      "Set AUTH_TEST_USERNAME, AUTH_TEST_EMAIL, and AUTH_TEST_PASSWORD in .env before seeding."
    );
  }

  if (password.length < 12) {
    throw new Error("AUTH_TEST_PASSWORD must contain at least 12 characters.");
  }

  await sequelize.authenticate();

  const [user] = await User.findOrCreate({
    where: { username },
    defaults: { username, email, password, status: "active" },
  });
  await user.update({ email, password, status: "active" });

  const [role] = await Role.findOrCreate({
    where: { name: "AUTH_TESTER" },
    defaults: {
      name: "AUTH_TESTER",
      description: "Role used to test authenticated session endpoints",
      status: "active",
    },
  });
  await role.update({ status: "active" });

  const [resource] = await Resource.findOrCreate({
    where: { method: "GET", path: "/api/sesion/me" },
    defaults: {
      method: "GET",
      path: "/api/sesion/me",
      description: "Get the authenticated user's profile",
      status: "active",
    },
  });
  await resource.update({ status: "active" });

  const [roleUser] = await RoleUser.findOrCreate({
    where: { user_id: user.id, role_id: role.id },
    defaults: { user_id: user.id, role_id: role.id, status: "active" },
  });
  await roleUser.update({ status: "active" });

  const [resourceRole] = await ResourceRole.findOrCreate({
    where: { role_id: role.id, resource_id: resource.id },
    defaults: { role_id: role.id, resource_id: resource.id, status: "active" },
  });
  await resourceRole.update({ status: "active" });

  console.log(`Authentication test account is ready: ${username}`);
}

seedAuthTestAccount()
  .catch((error: unknown) => {
    console.error("Could not seed authentication test data:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await sequelize.close();
  });
