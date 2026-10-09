import { Application, Router } from "express";
import { checkRole, verifyToken } from "../../middlewares/auth.middleware";
import { AdminController } from "./admin.controller";

const router = Router();
const controller = new AdminController();
const adminOnly = [verifyToken, checkRole(["ADMINISTRADOR"])] as const;

/**
 * @openapi
 * /api/admin/accounts:
 *   get:
 *     summary: Listar cuentas de autenticacion
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Cuentas y asignaciones de roles }
 *   post:
 *     summary: Crear cuenta de autenticacion con un rol
 *     security: [{ bearerAuth: [] }]
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
 *     responses:
 *       200: { description: Cuenta actualizada }
 * /api/admin/accounts/{id}/password:
 *   patch:
 *     summary: Cambiar contrasena e invalidar refresh sessions
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Contrasena cambiada }
 * /api/admin/accounts/{id}/status:
 *   patch:
 *     summary: Activar o desactivar cuenta
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Estado actualizado }
 * /api/admin/accounts/{id}/roles:
 *   post:
 *     summary: Asignar o reactivar un rol
 *     security: [{ bearerAuth: [] }]
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
 *     responses:
 *       200: { description: Rol actualizado }
 * /api/admin/roles/{id}/status:
 *   patch:
 *     summary: Activar o desactivar rol
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Estado actualizado }
 * /api/admin/roles/{id}/resources:
 *   put:
 *     summary: Reconciliar la lista completa de recursos concedidos al rol
 *     security: [{ bearerAuth: [] }]
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
 *     responses:
 *       200: { description: Recurso actualizado }
 * /api/admin/resources/{id}/status:
 *   patch:
 *     summary: Activar o desactivar recurso
 *     security: [{ bearerAuth: [] }]
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
 *     responses:
 *       201: { description: Concesion creada }
 * /api/admin/resource-roles/{id}/status:
 *   patch:
 *     summary: Activar o revocar concesion
 *     security: [{ bearerAuth: [] }]
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
