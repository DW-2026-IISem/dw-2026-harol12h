"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRoutes = void 0;
const supplier_controller_1 = require("./supplier.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
/**
 * @openapi
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Textiles del Norte S.A."
 *         contact_name:
 *           type: string
 *           example: "Carlos Gómez"
 *         email:
 *           type: string
 *           example: "contacto@textilesnorte.com"
 *         phone:
 *           type: string
 *           example: "+573001234567"
 *         address:
 *           type: string
 *           example: "Calle 45 # 12-34, Medellín"
 *         is_active:
 *           type: boolean
 *           example: true
 *     SupplierInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Textiles del Norte S.A."
 *         contact_name:
 *           type: string
 *           example: "Carlos Gómez"
 *         email:
 *           type: string
 *           example: "contacto@textilesnorte.com"
 *         phone:
 *           type: string
 *           example: "+573001234567"
 *         address:
 *           type: string
 *           example: "Calle 45 # 12-34, Medellín"
 */
class SupplierRoutes {
    constructor() {
        this.supplierController = new supplier_controller_1.SupplierController();
    }
    routes(app) {
        /**
         * @openapi
         * /api/proveedores:
         *   get:
         *     summary: Obtener todos los proveedores activos
         *     tags: [Suppliers]
         *     responses:
         *       200:
         *         description: Lista de proveedores
         *   post:
         *     summary: Registrar un nuevo proveedor
         *     tags: [Suppliers]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/SupplierInput'
         *     responses:
         *       201:
         *         description: Proveedor registrado exitosamente
         */
        app
            .route("/api/proveedores")
            .get(auth_middleware_1.verifyToken, this.supplierController.getAll.bind(this.supplierController))
            .post(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.supplierController.create.bind(this.supplierController));
        /**
         * @openapi
         * /api/proveedores/{id}:
         *   get:
         *     summary: Obtener proveedor por ID
         *     tags: [Suppliers]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Proveedor encontrado
         *       404:
         *         description: No encontrado
         *   put:
         *     summary: Actualizar información de un proveedor
         *     tags: [Suppliers]
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
         *             $ref: '#/components/schemas/SupplierInput'
         *     responses:
         *       200:
         *         description: Proveedor actualizado
         */
        app
            .route("/api/proveedores/:id")
            .get(auth_middleware_1.verifyToken, this.supplierController.getOne.bind(this.supplierController))
            .put(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.supplierController.update.bind(this.supplierController))
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.supplierController.deleteLogical.bind(this.supplierController));
        /**
         * @openapi
         * /api/proveedores/{id}/deactivate:
         *   patch:
         *     summary: Desactivar proveedor (borrado lógico)
         *     tags: [Suppliers]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Proveedor desactivado
         */
        app
            .route("/api/proveedores/:id/deactivate")
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.supplierController.deleteLogical.bind(this.supplierController))
            .patch(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.supplierController.deleteLogical.bind(this.supplierController));
    }
}
exports.SupplierRoutes = SupplierRoutes;
//# sourceMappingURL=supplier.routes.js.map