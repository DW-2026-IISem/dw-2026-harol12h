"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchRoutes = void 0;
const branch_controller_1 = require("./branch.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Sucursal Centro Principal"
 *         direccion:
 *           type: string
 *           example: "Calle Principal # 45 - 12"
 *         telefono:
 *           type: string
 *           example: "3001234567"
 *         is_active:
 *           type: boolean
 *           example: true
 *     BranchInput:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Sucursal Centro Principal"
 *         direccion:
 *           type: string
 *           example: "Calle Principal # 45 - 12"
 *         telefono:
 *           type: string
 *           example: "3001234567"
 */
class BranchRoutes {
    constructor() {
        this.branchController = new branch_controller_1.BranchController();
    }
    routes(app) {
        /**
         * @openapi
         * /api/sucursales:
         *   get:
         *     summary: Obtener sucursales activas (público)
         *     tags: [Branches]
         *     security: []
         *     responses:
         *       200:
         *         description: Lista de sucursales
         *   post:
         *     summary: Crear una nueva sucursal
         *     tags: [Branches]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/BranchInput'
         *     responses:
         *       201:
         *         description: Sucursal creada exitosamente
         */
        app
            .route("/api/sucursales")
            .get(this.branchController.getAll.bind(this.branchController))
            .post(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.branchController.create.bind(this.branchController));
        /**
         * @openapi
         * /api/sucursales/{id}:
         *   get:
         *     summary: Obtener sucursal por ID (público)
         *     tags: [Branches]
         *     security: []
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Sucursal encontrada
         *       404:
         *         description: Sucursal no encontrada
         *   put:
         *     summary: Actualizar sucursal por ID
         *     tags: [Branches]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/BranchInput'
         *     responses:
         *       200:
         *         description: Sucursal actualizada
         */
        app
            .route("/api/sucursales/:id")
            .get(this.branchController.getOne.bind(this.branchController))
            .put(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.branchController.update.bind(this.branchController))
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.branchController.deleteLogical.bind(this.branchController));
        /**
         * @openapi
         * /api/sucursales/{id}/deactivate:
         *   patch:
         *     summary: Desactivar sucursal (borrado lógico)
         *     tags: [Branches]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Sucursal desactivada
         */
        app
            .route("/api/sucursales/:id/deactivate")
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.branchController.deleteLogical.bind(this.branchController))
            .patch(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.branchController.deleteLogical.bind(this.branchController));
    }
}
exports.BranchRoutes = BranchRoutes;
//# sourceMappingURL=branch.routes.js.map