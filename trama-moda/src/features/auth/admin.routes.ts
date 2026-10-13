import { Application, Router } from "express";
import { checkRole, verifyToken } from "../../middlewares/auth.middleware";
import { AdminController } from "./admin.controller";

const router = Router();
const controller = new AdminController();
const adminOnly = [verifyToken, checkRole(["ADMINISTRADOR"])] as const;

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAuthAccountInput:
 *       type: object
 *       required: [username, email, password, role]
 *       properties:
 *         username: { type: string, minLength: 3, maxLength: 80, example: vendedor1 }
 *         email: { type: string, format: email, example: vendedor1@example.com }
 *         password: { type: string, minLength: 12, format: password, example: ClaveSeguraDe12 }
 *         role: { type: string, example: VENDEDOR }
 *     UpdateAuthAccountInput:
 *       type: object
 *       minProperties: 1
 *       properties:
 *         username: { type: string, minLength: 3, maxLength: 80, example: vendedor_nuevo }
 *         email: { type: string, format: email, example: vendedor.nuevo@example.com }
 *     ChangeAccountPasswordInput:
 *       type: object
 *       required: [password]
 *       properties:
 *         password: { type: string, minLength: 12, format: password, example: NuevaClaveSegura12 }
 *     AccountStatusInput:
 *       type: object
 *       required: [status]
 *       properties:
 *         status: { type: string, enum: [active, inactive], example: inactive }
 *     AssignAccountRoleInput:
 *       type: object
 *       required: [roleId]
 *       properties:
 *         roleId: { type: integer, minimum: 1, example: 2 }
 *     RoleInput:
 *       type: object
 *       required: [name]
 *       properties:
 *         name: { type: string, pattern: '^[A-Z][A-Z0-9_]{1,79}$', example: CLIENTE }
 *         description: { type: string, nullable: true, example: Rol de consulta para clientes }
 *     RoleUpdateInput:
 *       type: object
 *       properties:
 *         description: { type: string, nullable: true, example: Rol de consulta para clientes }
 *     RoleStatusInput:
 *       type: object
 *       required: [status]
 *       properties:
 *         status: { type: string, enum: [active, inactive], example: active }
 *     RoleResourcesInput:
 *       type: object
 *       required: [resourceIds]
 *       properties:
 *         resourceIds:
 *           type: array
 *           items: { type: integer, minimum: 1 }
 *           example: [1, 3, 5]
 *     ResourceInput:
 *       type: object
 *       required: [method, path]
 *       properties:
 *         method: { type: string, enum: [GET, POST, PUT, PATCH, DELETE], example: GET }
 *         path: { type: string, example: /api/productos/:id }
 *         description: { type: string, nullable: true, example: Consultar un producto }
 *     ResourceUpdateInput:
 *       type: object
 *       properties:
 *         method: { type: string, enum: [GET, POST, PUT, PATCH, DELETE], example: GET }
 *         path: { type: string, example: /api/productos/:id }
 *         description: { type: string, nullable: true, example: Consultar un producto }
 *     ResourceRoleInput:
 *       type: object
 *       required: [roleId, resourceId]
 *       properties:
 *         roleId: { type: integer, minimum: 1, example: 2 }
 *         resourceId: { type: integer, minimum: 1, example: 1 }
 *     RoleUserInput:
 *       type: object
 *       required: [userId, roleId]
 *       properties:
 *         userId: { type: integer, minimum: 1, example: 3 }
 *         roleId: { type: integer, minimum: 1, example: 2 }
 *     ResourceRoleStatusInput:
 *       type: object
 *       required: [status]
 *       properties:
 *         status: { type: string, enum: [active, inactive], example: inactive }
 * /api/admin/accounts:
 *   get:
 *     summary: Listar cuentas de autenticacion
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Cuentas y asignaciones de roles }
 *   post:
 *     summary: Crear cuenta de autenticacion con un rol
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAuthAccountInput'
 *     responses:
 *       201: { description: Cuenta creada }
 * /api/admin/accounts/{id}:
 *   get:
 *     summary: Consultar cuenta de autenticacion
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Cuenta sin hash de contrasena }
 *   put:
 *     summary: Actualizar nombre de usuario y correo
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAuthAccountInput'
 *     responses:
 *       200: { description: Cuenta actualizada }
 * /api/admin/accounts/{id}/password:
 *   patch:
 *     summary: Cambiar contrasena e invalidar refresh sessions
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeAccountPasswordInput'
 *     responses:
 *       200: { description: Contrasena cambiada }
 * /api/admin/accounts/{id}/status:
 *   patch:
 *     summary: Activar o desactivar cuenta
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccountStatusInput'
 *     responses:
 *       200: { description: Estado actualizado }
 * /api/admin/accounts/{id}/roles:
 *   post:
 *     summary: Asignar o reactivar un rol
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignAccountRoleInput'
 *     responses:
 *       200: { description: Rol asignado }
 * /api/admin/accounts/{id}/roles/{roleId}:
 *   delete:
 *     summary: Revocar un rol de una cuenta
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Rol revocado }
 * /api/admin/roles:
 *   get:
 *     summary: Listar roles activos
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Roles }
 *   post:
 *     summary: Crear o reactivar un rol
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       201: { description: Rol creado }
 * /api/admin/roles/{id}:
 *   get:
 *     summary: Consultar rol
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Rol }
 *   put:
 *     summary: Actualizar descripcion del rol
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleUpdateInput'
 *     responses:
 *       200: { description: Rol actualizado }
 * /api/admin/roles/{id}/status:
 *   patch:
 *     summary: Activar o desactivar rol
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleStatusInput'
 *     responses:
 *       200: { description: Estado actualizado }
 * /api/admin/roles/{id}/resources:
 *   put:
 *     summary: Reconciliar la lista completa de recursos concedidos al rol
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleResourcesInput'
 *     responses:
 *       200: { description: Concesiones reconciliadas }
 * /api/admin/resources:
 *   get:
 *     summary: Listar recursos de la API
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Recursos }
 *   post:
 *     summary: Crear o reactivar un recurso
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourceInput'
 *     responses:
 *       201: { description: Recurso creado }
 * /api/admin/resources/{id}:
 *   get:
 *     summary: Consultar recurso
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Recurso }
 *   put:
 *     summary: Actualizar metodo, ruta o descripcion
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourceUpdateInput'
 *     responses:
 *       200: { description: Recurso actualizado }
 * /api/admin/resources/{id}/status:
 *   patch:
 *     summary: Activar o desactivar recurso
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourceRoleStatusInput'
 *     responses:
 *       200: { description: Estado actualizado }
 * /api/admin/role-users:
 *   get:
 *     summary: Listar asignaciones cuenta-rol
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Asignaciones }
 *   post:
 *     summary: Crear o reactivar una asignacion cuenta-rol
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleUserInput'
 *     responses:
 *       201: { description: Asignacion creada }
 * /api/admin/resource-roles:
 *   get:
 *     summary: Listar concesiones rol-recurso
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Concesiones }
 *   post:
 *     summary: Crear o reactivar una concesion rol-recurso
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourceRoleInput'
 *     responses:
 *       201: { description: Concesion creada }
 * /api/admin/resource-roles/{id}/status:
 *   patch:
 *     summary: Activar o revocar concesion
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourceRoleStatusInput'
 *     responses:
 *       200: { description: Estado actualizado }
 */
router.get("/accounts", ...adminOnly, controller.listAccounts);
router.post("/accounts", ...adminOnly, controller.createAccount);
router.get("/accounts/:id", ...adminOnly, controller.getAccount);
router.put("/accounts/:id", ...adminOnly, controller.updateAccount);
router.patch("/accounts/:id/password", ...adminOnly, controller.changeAccountPassword);
router.get("/roles", ...adminOnly, controller.listRoles);
router.post("/roles", ...adminOnly, controller.createRole);
router.get("/roles/:id", ...adminOnly, controller.getRole);
router.put("/roles/:id", ...adminOnly, controller.updateRole);
router.patch("/roles/:id/status", ...adminOnly, controller.setRoleStatus);
router.post("/accounts/:id/roles", ...adminOnly, controller.assignRole);
router.delete("/accounts/:id/roles/:roleId", ...adminOnly, controller.revokeRole);
router.patch("/accounts/:id/status", ...adminOnly, controller.setAccountStatus);
router.get("/resources", ...adminOnly, controller.listResources);
router.post("/resources", ...adminOnly, controller.createResource);
router.get("/resources/:id", ...adminOnly, controller.getResource);
router.put("/resources/:id", ...adminOnly, controller.updateResource);
router.patch("/resources/:id/status", ...adminOnly, controller.setResourceStatus);
router.get("/role-users", ...adminOnly, controller.listRoleUsers);
router.post("/role-users", ...adminOnly, controller.createRoleUser);
router.get("/resource-roles", ...adminOnly, controller.listResourceRoles);
router.post("/resource-roles", ...adminOnly, controller.createResourceRole);
router.patch("/resource-roles/:id/status", ...adminOnly, controller.setResourceRoleStatus);
router.put("/roles/:id/resources", ...adminOnly, controller.reconcileRoleResources);

export class AdminRoutes {
  public routes(app: Application): void {
    app.use("/api/admin", router);
  }
}
