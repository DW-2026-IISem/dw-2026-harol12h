"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRolesRepository = void 0;
const resource_role_model_1 = require("./resource-role.model");
const role_user_model_1 = require("../role-users/role-user.model");
const role_model_1 = require("../roles/role.model");
const resource_model_1 = require("../resources/resource.model");
class ResourceRolesRepository {
    async findEffectiveForUser(userId) {
        const userRoles = await role_user_model_1.RoleUser.findAll({
            where: { user_id: userId, status: "active" },
            include: [{ model: role_model_1.Role, as: "role", where: { status: "active" }, required: true }],
        });
        if (userRoles.length === 0)
            return [];
        const roleIds = userRoles.map((ur) => ur.role_id);
        const resourceRoles = await resource_role_model_1.ResourceRole.findAll({
            where: { role_id: roleIds, status: "active" },
            include: [{ model: resource_model_1.Resource, as: "resource", where: { status: "active" }, required: true }],
        });
        const results = [];
        for (const item of resourceRoles) {
            const res = item.get("resource");
            if (res) {
                results.push({ method: res.method, path: res.path });
            }
        }
        return results;
    }
}
exports.ResourceRolesRepository = ResourceRolesRepository;
//# sourceMappingURL=resource-roles.repository.js.map