"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../database/db");
const app_error_1 = require("../../shared/errors/app-error");
const base_controller_1 = require("../../shared/http/base-controller");
const sync_rbac_resources_1 = require("../../database/sync-rbac-resources");
const role_user_model_1 = require("./role-users/role-user.model");
const role_model_1 = require("./roles/role.model");
const user_model_1 = require("./users/user.model");
const resource_model_1 = require("./resources/resource.model");
const resource_role_model_1 = require("./resource-roles/resource-role.model");
const users_service_1 = require("./users/users.service");
const refresh_tokens_service_1 = require("./refresh-tokens/refresh-tokens.service");
const usersService = new users_service_1.UsersService();
const refreshTokensService = new refresh_tokens_service_1.RefreshTokensService();
class AdminController extends base_controller_1.BaseController {
    constructor() {
        super(...arguments);
        this.listAccounts = async (_req, res) => {
            await this.run(res, async () => {
                const users = await user_model_1.User.findAll({
                    attributes: ["id", "username", "email", "status", "createdAt", "updatedAt"],
                    include: [
                        {
                            model: role_user_model_1.RoleUser,
                            as: "role_users",
                            attributes: ["id", "status"],
                            include: [{ model: role_model_1.Role, as: "role", attributes: ["id", "name", "status"] }],
                        },
                    ],
                    order: [["id", "ASC"]],
                });
                res.status(200).json({ users });
            });
        };
        this.getAccount = async (req, res) => {
            await this.run(res, async () => {
                res.status(200).json({ user: await usersService.get(this.paramId(req)) });
            });
        };
        this.createAccount = async (req, res) => {
            await this.run(res, async () => {
                const body = req.body && typeof req.body === "object" ? req.body : {};
                const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
                const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
                const password = typeof body.password === "string" ? body.password : "";
                const roleName = typeof body.role === "string" ? body.role.trim().toUpperCase() : "";
                if (!username || !email || !password || !roleName) {
                    throw new app_error_1.AppError(400, "username, email, password, and role are required");
                }
                if (username.length < 3 || username.length > 80) {
                    throw new app_error_1.AppError(400, "username must be between 3 and 80 characters");
                }
                if (password.length < 12) {
                    throw new app_error_1.AppError(400, "password must contain at least 12 characters");
                }
                if (email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    throw new app_error_1.AppError(400, "email must be a valid address of at most 150 characters");
                }
                const role = await role_model_1.Role.findOne({ where: { name: roleName, status: "active" } });
                if (!role)
                    throw new app_error_1.AppError(400, "An active role with that name does not exist");
                const duplicate = await user_model_1.User.findOne({
                    where: { [sequelize_1.Op.or]: [{ username }, { email }] },
                    attributes: ["id", "username", "email"],
                });
                if (duplicate)
                    throw new app_error_1.AppError(409, "Username or email is already in use");
                const transaction = await db_1.sequelize.transaction();
                try {
                    const user = await user_model_1.User.create({ username, email, password, status: "active" }, { transaction });
                    await role_user_model_1.RoleUser.create({ user_id: user.id, role_id: role.id, status: "active" }, { transaction });
                    await transaction.commit();
                    res.status(201).json({
                        user: { id: user.id, username: user.username, email: user.email, status: user.status },
                        role: { id: role.id, name: role.name },
                    });
                }
                catch (error) {
                    await transaction.rollback();
                    if (error instanceof sequelize_1.UniqueConstraintError) {
                        throw new app_error_1.AppError(409, "Username or email is already in use");
                    }
                    throw error;
                }
            });
        };
        this.listRoles = async (_req, res) => {
            await this.run(res, async () => {
                const roles = await role_model_1.Role.findAll({
                    where: { status: "active" },
                    attributes: ["id", "name", "description"],
                    order: [["name", "ASC"]],
                });
                res.status(200).json({ roles });
            });
        };
        this.getRole = async (req, res) => {
            await this.run(res, async () => {
                const role = await role_model_1.Role.findByPk(this.paramId(req), {
                    attributes: ["id", "name", "description", "status", "createdAt", "updatedAt"],
                });
                if (!role)
                    throw new app_error_1.AppError(404, "Role not found");
                res.status(200).json({ role });
            });
        };
        this.createRole = async (req, res) => {
            await this.run(res, async () => {
                const body = req.body && typeof req.body === "object" ? req.body : {};
                const name = typeof body.name === "string" ? body.name.trim().toUpperCase() : "";
                const description = typeof body.description === "string" ? body.description.trim() : null;
                if (!/^[A-Z][A-Z0-9_]{1,79}$/.test(name)) {
                    throw new app_error_1.AppError(400, "name must start with a letter and contain 2-80 letters, digits, or underscores");
                }
                const [role, created] = await role_model_1.Role.findOrCreate({
                    where: { name },
                    defaults: { name, description, status: "active" },
                });
                if (!created && role.status !== "active")
                    await role.update({ status: "active", description });
                if (!created && role.status === "active") {
                    throw new app_error_1.AppError(409, "An active role with that name already exists");
                }
                await (0, sync_rbac_resources_1.syncRbacResources)([role]);
                res.status(created ? 201 : 200).json({
                    role: { id: role.id, name: role.name, description: role.description, status: role.status },
                });
            });
        };
        this.setRoleStatus = async (req, res) => {
            await this.run(res, async () => {
                const roleId = this.paramId(req);
                const status = req.body?.status;
                if (status !== "active" && status !== "inactive") {
                    throw new app_error_1.AppError(400, "status must be active or inactive");
                }
                const role = await role_model_1.Role.findByPk(roleId);
                if (!role)
                    throw new app_error_1.AppError(404, "Role not found");
                if (role.name === "ADMINISTRADOR" && status === "inactive") {
                    throw new app_error_1.AppError(409, "The ADMINISTRADOR role cannot be deactivated");
                }
                if (status === "inactive") {
                    const assignments = await role_user_model_1.RoleUser.count({
                        where: { role_id: role.id, status: "active" },
                    });
                    if (assignments > 0) {
                        throw new app_error_1.AppError(409, "Revoke this role from all accounts before deactivating it");
                    }
                }
                await role.update({ status });
                res.status(200).json({ role: { id: role.id, name: role.name, status: role.status } });
            });
        };
        this.updateRole = async (req, res) => {
            await this.run(res, async () => {
                const role = await role_model_1.Role.findByPk(this.paramId(req));
                if (!role)
                    throw new app_error_1.AppError(404, "Role not found");
                const description = req.body?.description;
                if (description !== undefined && description !== null && typeof description !== "string") {
                    throw new app_error_1.AppError(400, "description must be a string or null");
                }
                await role.update({ description: typeof description === "string" ? description.trim() : description });
                res.status(200).json({
                    role: { id: role.id, name: role.name, description: role.description, status: role.status },
                });
            });
        };
        this.assignRole = async (req, res) => {
            await this.run(res, async () => {
                const userId = this.paramId(req);
                const roleId = Number(req.body?.roleId);
                if (!Number.isInteger(roleId) || roleId < 1) {
                    throw new app_error_1.AppError(400, "roleId must be a positive integer");
                }
                const [user, role] = await Promise.all([
                    user_model_1.User.findByPk(userId),
                    role_model_1.Role.findOne({ where: { id: roleId, status: "active" } }),
                ]);
                if (!user)
                    throw new app_error_1.AppError(404, "Authentication account not found");
                if (!role)
                    throw new app_error_1.AppError(404, "Active role not found");
                const [assignment] = await role_user_model_1.RoleUser.findOrCreate({
                    where: { user_id: user.id, role_id: role.id },
                    defaults: { user_id: user.id, role_id: role.id, status: "active" },
                });
                if (assignment.status !== "active")
                    await assignment.update({ status: "active" });
                res.status(200).json({
                    message: "Role assigned",
                    assignment: { userId: user.id, roleId: role.id, role: role.name, status: assignment.status },
                });
            });
        };
        this.setAccountStatus = async (req, res) => {
            await this.run(res, async () => {
                const userId = this.paramId(req);
                const status = req.body?.status;
                if (status !== "active" && status !== "inactive") {
                    throw new app_error_1.AppError(400, "status must be active or inactive");
                }
                if (status === "inactive" && req.auth?.id === userId) {
                    throw new app_error_1.AppError(409, "You cannot deactivate your own authentication account");
                }
                const user = await user_model_1.User.findByPk(userId);
                if (!user)
                    throw new app_error_1.AppError(404, "Authentication account not found");
                if (status === "inactive") {
                    const adminRole = await role_model_1.Role.findOne({ where: { name: "ADMINISTRADOR" } });
                    if (adminRole) {
                        const assignment = await role_user_model_1.RoleUser.findOne({
                            where: { user_id: userId, role_id: adminRole.id, status: "active" },
                        });
                        if (assignment) {
                            const activeAdminCount = await role_user_model_1.RoleUser.count({
                                where: { role_id: adminRole.id, status: "active" },
                                include: [{ model: user_model_1.User, as: "user", where: { status: "active" }, required: true }],
                            });
                            if (activeAdminCount <= 1) {
                                throw new app_error_1.AppError(409, "Cannot deactivate the last active administrator account");
                            }
                        }
                    }
                }
                await user.update({ status });
                res.status(200).json({ message: "Authentication account updated", userId, status });
            });
        };
        this.updateAccount = async (req, res) => {
            await this.run(res, async () => {
                const user = await usersService.update(this.paramId(req), {
                    username: req.body?.username,
                    email: req.body?.email,
                });
                res.status(200).json({ user });
            });
        };
        this.changeAccountPassword = async (req, res) => {
            await this.run(res, async () => {
                const userId = this.paramId(req);
                await usersService.changePassword(userId, req.body?.password);
                await refreshTokensService.revokeAllForUser(userId);
                res.status(200).json({ message: "Password updated; all refresh sessions were revoked" });
            });
        };
        this.listResources = async (_req, res) => {
            await this.run(res, async () => {
                const resources = await resource_model_1.Resource.findAll({ order: [["method", "ASC"], ["path", "ASC"]] });
                res.status(200).json({ resources });
            });
        };
        this.createResource = async (req, res) => {
            await this.run(res, async () => {
                const method = typeof req.body?.method === "string" ? req.body.method.trim().toUpperCase() : "";
                const path = typeof req.body?.path === "string" ? req.body.path.trim() : "";
                const description = typeof req.body?.description === "string" ? req.body.description.trim() : null;
                if (!/^(GET|POST|PUT|PATCH|DELETE)$/.test(method) || !path.startsWith("/") || path.length > 255) {
                    throw new app_error_1.AppError(400, "method or path is invalid");
                }
                const [resource, created] = await resource_model_1.Resource.findOrCreate({
                    where: { method, path },
                    defaults: { method, path, description, status: "active" },
                });
                if (!created && resource.status === "active") {
                    throw new app_error_1.AppError(409, "An active resource with that method and path already exists");
                }
                await resource.update({ description, status: "active" });
                res.status(created ? 201 : 200).json({ resource });
            });
        };
        this.getResource = async (req, res) => {
            await this.run(res, async () => {
                const resource = await resource_model_1.Resource.findByPk(this.paramId(req));
                if (!resource)
                    throw new app_error_1.AppError(404, "Resource not found");
                res.status(200).json({ resource });
            });
        };
        this.updateResource = async (req, res) => {
            await this.run(res, async () => {
                const resource = await resource_model_1.Resource.findByPk(this.paramId(req));
                if (!resource)
                    throw new app_error_1.AppError(404, "Resource not found");
                const method = typeof req.body?.method === "string" ? req.body.method.trim().toUpperCase() : resource.method;
                const path = typeof req.body?.path === "string" ? req.body.path.trim() : resource.path;
                const description = req.body?.description === undefined
                    ? resource.description
                    : typeof req.body.description === "string" ? req.body.description.trim() : null;
                if (!/^(GET|POST|PUT|PATCH|DELETE)$/.test(method) || !path.startsWith("/") || path.length > 255) {
                    throw new app_error_1.AppError(400, "method or path is invalid");
                }
                const duplicate = await resource_model_1.Resource.findOne({
                    where: { method, path, id: { [sequelize_1.Op.ne]: resource.id } },
                });
                if (duplicate)
                    throw new app_error_1.AppError(409, "A resource with that method and path already exists");
                await resource.update({ method, path, description });
                res.status(200).json({ resource });
            });
        };
        this.setResourceStatus = async (req, res) => {
            await this.run(res, async () => {
                const resourceId = this.paramId(req);
                const status = req.body?.status;
                if (status !== "active" && status !== "inactive") {
                    throw new app_error_1.AppError(400, "status must be active or inactive");
                }
                const resource = await resource_model_1.Resource.findByPk(resourceId);
                if (!resource)
                    throw new app_error_1.AppError(404, "Resource not found");
                await db_1.sequelize.transaction(async (transaction) => {
                    await resource.update({ status }, { transaction });
                    if (status === "inactive") {
                        await resource_role_model_1.ResourceRole.update({ status: "inactive" }, { where: { resource_id: resource.id, status: "active" }, transaction });
                    }
                });
                res.status(200).json({ resource: { id: resource.id, method: resource.method, path: resource.path, status } });
            });
        };
        this.listRoleUsers = async (req, res) => {
            await this.run(res, async () => {
                const where = req.query.userId === undefined ? {} : { user_id: this.queryPositiveId(req.query.userId, "userId") };
                const assignments = await role_user_model_1.RoleUser.findAll({
                    where,
                    include: [
                        { model: user_model_1.User, as: "user", attributes: ["id", "username", "email", "status"] },
                        { model: role_model_1.Role, as: "role", attributes: ["id", "name", "status"] },
                    ],
                    order: [["id", "ASC"]],
                });
                res.status(200).json({ assignments });
            });
        };
        this.createRoleUser = async (req, res) => {
            await this.run(res, async () => {
                const userId = this.bodyPositiveId(req.body?.userId, "userId");
                const roleId = this.bodyPositiveId(req.body?.roleId, "roleId");
                const [user, role] = await Promise.all([
                    user_model_1.User.findByPk(userId),
                    role_model_1.Role.findOne({ where: { id: roleId, status: "active" } }),
                ]);
                if (!user || user.status !== "active")
                    throw new app_error_1.AppError(404, "Active account not found");
                if (!role)
                    throw new app_error_1.AppError(404, "Active role not found");
                const [assignment, created] = await role_user_model_1.RoleUser.findOrCreate({
                    where: { user_id: userId, role_id: roleId },
                    defaults: { user_id: userId, role_id: roleId, status: "active" },
                });
                if (assignment.status !== "active")
                    await assignment.update({ status: "active" });
                res.status(created ? 201 : 200).json({
                    assignment: { id: assignment.id, userId, roleId, status: assignment.status },
                });
            });
        };
        this.listResourceRoles = async (req, res) => {
            await this.run(res, async () => {
                const where = {};
                if (req.query.roleId !== undefined)
                    where.role_id = this.queryPositiveId(req.query.roleId, "roleId");
                if (req.query.resourceId !== undefined)
                    where.resource_id = this.queryPositiveId(req.query.resourceId, "resourceId");
                const grants = await resource_role_model_1.ResourceRole.findAll({
                    where,
                    include: [
                        { model: role_model_1.Role, as: "role", attributes: ["id", "name", "status"] },
                        { model: resource_model_1.Resource, as: "resource", attributes: ["id", "method", "path", "status"] },
                    ],
                    order: [["id", "ASC"]],
                });
                res.status(200).json({ grants });
            });
        };
        this.createResourceRole = async (req, res) => {
            await this.run(res, async () => {
                const roleId = this.bodyPositiveId(req.body?.roleId, "roleId");
                const resourceId = this.bodyPositiveId(req.body?.resourceId, "resourceId");
                const [role, resource] = await Promise.all([
                    role_model_1.Role.findOne({ where: { id: roleId, status: "active" } }),
                    resource_model_1.Resource.findOne({ where: { id: resourceId, status: "active" } }),
                ]);
                if (!role)
                    throw new app_error_1.AppError(404, "Active role not found");
                if (!resource)
                    throw new app_error_1.AppError(404, "Active resource not found");
                const [grant, created] = await resource_role_model_1.ResourceRole.findOrCreate({
                    where: { role_id: roleId, resource_id: resourceId },
                    defaults: { role_id: roleId, resource_id: resourceId, status: "active" },
                });
                if (grant.status !== "active")
                    await grant.update({ status: "active" });
                res.status(created ? 201 : 200).json({
                    grant: { id: grant.id, roleId, resourceId, status: grant.status },
                });
            });
        };
        this.setResourceRoleStatus = async (req, res) => {
            await this.run(res, async () => {
                const grantId = this.paramId(req);
                const status = req.body?.status;
                if (status !== "active" && status !== "inactive") {
                    throw new app_error_1.AppError(400, "status must be active or inactive");
                }
                const grant = await resource_role_model_1.ResourceRole.findByPk(grantId);
                if (!grant)
                    throw new app_error_1.AppError(404, "Resource grant not found");
                await grant.update({ status });
                res.status(200).json({ grant: { id: grant.id, status: grant.status } });
            });
        };
        this.reconcileRoleResources = async (req, res) => {
            await this.run(res, async () => {
                const roleId = this.paramId(req);
                const ids = req.body?.resourceIds;
                if (!Array.isArray(ids) || ids.some((id) => typeof id !== "number" || !Number.isInteger(id) || id < 1)) {
                    throw new app_error_1.AppError(400, "resourceIds must be an array of positive integers");
                }
                const uniqueIds = [...new Set(ids)];
                const role = await role_model_1.Role.findOne({ where: { id: roleId, status: "active" } });
                if (!role)
                    throw new app_error_1.AppError(404, "Active role not found");
                const activeResources = await resource_model_1.Resource.findAll({
                    where: { id: uniqueIds, status: "active" },
                    attributes: ["id"],
                });
                if (activeResources.length !== uniqueIds.length) {
                    throw new app_error_1.AppError(400, "Every resourceId must refer to an active resource");
                }
                await db_1.sequelize.transaction(async (transaction) => {
                    const current = await resource_role_model_1.ResourceRole.findAll({ where: { role_id: roleId }, transaction });
                    const activeIds = new Set(uniqueIds);
                    for (const grant of current) {
                        const status = activeIds.has(grant.resource_id) ? "active" : "inactive";
                        if (grant.status !== status)
                            await grant.update({ status }, { transaction });
                        activeIds.delete(grant.resource_id);
                    }
                    for (const resourceId of activeIds) {
                        await resource_role_model_1.ResourceRole.create({ role_id: roleId, resource_id: resourceId, status: "active" }, { transaction });
                    }
                });
                res.status(200).json({ roleId, resourceIds: uniqueIds });
            });
        };
        this.revokeRole = async (req, res) => {
            await this.run(res, async () => {
                const userId = this.paramId(req);
                const roleIdRaw = Array.isArray(req.params.roleId) ? req.params.roleId[0] : req.params.roleId;
                if (!roleIdRaw || !/^[1-9]\d*$/.test(roleIdRaw)) {
                    throw new app_error_1.AppError(400, "Invalid roleId: must be a positive integer");
                }
                const roleId = Number(roleIdRaw);
                const assignment = await role_user_model_1.RoleUser.findOne({ where: { user_id: userId, role_id: roleId } });
                if (!assignment)
                    throw new app_error_1.AppError(404, "Role assignment not found");
                const role = await role_model_1.Role.findByPk(roleId);
                if (role?.name === "ADMINISTRADOR" && assignment.status === "active") {
                    const activeAdmins = await role_user_model_1.RoleUser.count({
                        where: { role_id: roleId, status: "active" },
                        include: [{ model: user_model_1.User, as: "user", where: { status: "active" }, required: true }],
                    });
                    if (activeAdmins <= 1) {
                        throw new app_error_1.AppError(409, "Cannot revoke the last active administrator role");
                    }
                }
                if (assignment.status === "active")
                    await assignment.update({ status: "inactive" });
                res.status(200).json({ message: "Role revoked", userId, roleId });
            });
        };
    }
    bodyPositiveId(value, name) {
        const id = typeof value === "number" ? value : Number(value);
        if (!Number.isInteger(id) || id < 1)
            throw new app_error_1.AppError(400, `${name} must be a positive integer`);
        return id;
    }
    queryPositiveId(value, name) {
        if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) {
            throw new app_error_1.AppError(400, `${name} must be a positive integer`);
        }
        return Number(value);
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map