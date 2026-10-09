import { ResourceRole } from "./resource-role.model";
import { RoleUser } from "../role-users/role-user.model";
import { Role } from "../roles/role.model";
import { Resource } from "../resources/resource.model";

export class ResourceRolesRepository {
  async findEffectiveForUser(userId: number): Promise<Array<{ method: string; path: string }>> {
    const userRoles = await RoleUser.findAll({
      where: { user_id: userId, status: "active" },
      include: [{ model: Role, as: "role", where: { status: "active" }, required: true }],
    });

    if (userRoles.length === 0) return [];

    const roleIds = userRoles.map((ur) => ur.role_id);

    const resourceRoles = await ResourceRole.findAll({
      where: { role_id: roleIds, status: "active" },
      include: [{ model: Resource, as: "resource", where: { status: "active" }, required: true }],
    });

    const results: Array<{ method: string; path: string }> = [];
    for (const item of resourceRoles) {
      const res = item.get("resource") as Resource | undefined;
      if (res) {
        results.push({ method: res.method, path: res.path });
      }
    }

    return results;
  }
}
