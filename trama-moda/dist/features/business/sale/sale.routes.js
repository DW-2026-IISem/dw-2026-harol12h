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
 *       required:
 *         - client_id
 *       properties:
 *         client_id:
 *           type: integer
 *           example: 1
 *         monto_total:
 *           type: number
 *           example: 150000
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
         *     summary: Registrar una nueva venta (Requiere Autenticación)
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
         *         description: Venta creada exitosamente
         */
        app
            .route("/api/ventas")
            .get(auth_middleware_1.verifyToken, this.saleController.getAll.bind(this.saleController))
            .post(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.saleController.create.bind(this.saleController));
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