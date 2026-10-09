import { Op } from "sequelize";
import { ResourceRole } from "../features/auth/resource-roles/resource-role.model";
import { Resource } from "../features/auth/resources/resource.model";
import { RESOURCE_CATALOG } from "../features/auth/resources/resource-catalog";
import { Role } from "../features/auth/roles/role.model";

export async function syncRbacResources(roles: Role[]): Promise<void> {
  const activeResourceIds: number[] = [];
  for (const item of RESOURCE_CATALOG) {
    const [resource] = await Resource.findOrCreate({
      where: { method: item.method, path: item.path },
      defaults: {
        method: item.method,
        path: item.path,
        description: item.description,
        status: "active",
      },
    });
    await resource.update({ description: item.description });
    activeResourceIds.push(resource.id);

    for (const role of roles) {
      const permitted = !item.roles || item.roles.includes(role.name);
      const grant = await ResourceRole.findOne({
        where: { role_id: role.id, resource_id: resource.id },
      });
      if (!permitted) {
        if (grant?.status === "active") await grant.update({ status: "inactive" });
        continue;
      }
      if (!grant) {
        await ResourceRole.create({
          role_id: role.id,
          resource_id: resource.id,
          status: "active",
        });
      }
    }
  }

  const staleResources = await Resource.findAll({
    where: { id: { [Op.notIn]: activeResourceIds } },
    attributes: ["id"],
  });
  const staleResourceIds = staleResources.map((resource) => resource.id);
  if (staleResourceIds.length > 0) {
    await Resource.update({ status: "inactive" }, { where: { id: staleResourceIds } });
    await ResourceRole.update(
      { status: "inactive" },
      { where: { resource_id: staleResourceIds } }
    );
  }
}
