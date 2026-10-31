"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRoutes = void 0;
const sale_controller_1 = require("./sale.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
/**
 * @openapi
 * components:
 *   schemas:
 *     SaleInput:
 *       type: object
 *       required: [client_id, items]
 *       properties:
 *         client_id:
 *           type: integer
 *           example: 1
 *         tax:
 *           type: number
 *           description: Porcentaje de impuesto a aplicar al subtotal.
 *           minimum: 0
 *           maximum: 100
 *           example: 19
 *         discounts:
 *           type: number
 *           description: Descuento monetario aplicado después del impuesto.
 *           minimum: 0
 *           example: 0
 *         items:
 *           type: array
 *           minItems: 1
 *           items:
 *             type: object
 *             required: [variantId, branchId, quantity]
 *             properties:
 *               variantId:
 *                 type: integer
 *               branchId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 */
class SaleRoutes {
    constructor() {
        this.saleController = new sale_controller_1.SaleController();
    }
    routes(app) {
        /**
         * @openapi
         * /api/ventas:
         *   get:
         *     summary: Obtener todas las ventas (Requiere Autenticación)
         *     tags: [Sales]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: Lista de ventas registradas
         *       401:
         *         description: No autorizado
         *   post:
         *     summary: Registrar una venta completa con sus detalles e inventario (Requiere Autenticación)
         *     tags: [Sales]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/SaleInput'
         *     responses:
         *       201:
         *         description: Venta, detalles y descuento de inventario confirmados
         */
        app
            .route("/api/ventas")
            .get(auth_middleware_1.verifyToken, this.saleController.getAll.bind(this.saleController))
            .post(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.saleController.create.bind(this.saleController));
        /**
         * @openapi
         * /api/ventas/catalogo:
         *   get:
         *     summary: Obtener variantes activas con existencias por sucursal
         *     tags: [Sales]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: Opciones disponibles para crear una venta
         */
        app
            .route("/api/ventas/catalogo")
            .get(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.saleController.getCatalog.bind(this.saleController));
        /**
         * @openapi
         * /api/ventas/{id}:
         *   get:
         *     summary: Obtener detalle de una venta por ID (Requiere Autenticación)
         *     tags: [Sales]
         *     security:
         *       - bearerAuth: []
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *     responses:
         *       200:
         *         description: Venta encontrada
         *       401:
         *         description: No autorizado
         */
        app
            .route("/api/ventas/:id")
            .get(auth_middleware_1.verifyToken, this.saleController.getOne.bind(this.saleController))
            .put(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.saleController.update.bind(this.saleController))
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.saleController.deleteLogical.bind(this.saleController));
        app
            .route("/api/ventas/:id/deactivate")
            .patch(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.saleController.deleteLogical.bind(this.saleController));
    }
}
exports.SaleRoutes = SaleRoutes;
//# sourceMappingURL=sale.routes.js.map