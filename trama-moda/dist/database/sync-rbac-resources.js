"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncRbacResources = syncRbacResources;
const sequelize_1 = require("sequelize");
const resource_role_model_1 = require("../features/auth/resource-roles/resource-role.model");
const resource_model_1 = require("../features/auth/resources/resource.model");
const resource_catalog_1 = require("../features/auth/resources/resource-catalog");
async function syncRbacResources(roles) {
    const activeResourceIds = [];
    for (const item of resource_catalog_1.RESOURCE_CATALOG) {
        const [resource] = await resource_model_1.Resource.findOrCreate({
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
            const grant = await resource_role_model_1.ResourceRole.findOne({
                where: { role_id: role.id, resource_id: resource.id },
            });
            if (!permitted) {
                if (grant?.status === "active")
                    await grant.update({ status: "inactive" });
                continue;
            }
            if (!grant) {
                await resource_role_model_1.ResourceRole.create({
                    role_id: role.id,
                    resource_id: resource.id,
                    status: "active",
                });
            }
        }
    }
    const staleResources = await resource_model_1.Resource.findAll({
        where: { id: { [sequelize_1.Op.notIn]: activeResourceIds } },
        attributes: ["id"],
    });
    const staleResourceIds = staleResources.map((resource) => resource.id);
    if (staleResourceIds.length > 0) {
        await resource_model_1.Resource.update({ status: "inactive" }, { where: { id: staleResourceIds } });
        await resource_role_model_1.ResourceRole.update({ status: "inactive" }, { where: { resource_id: staleResourceIds } });
    }
}
//# sourceMappingURL=sync-rbac-resources.js.map