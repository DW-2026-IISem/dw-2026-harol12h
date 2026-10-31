"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleDetailRoutes = void 0;
const sale_detail_controller_1 = require("./sale-detail.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
/**
 * @openapi
 * components:
 *   schemas:
 *     SaleDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         sale_id:
 *           type: integer
 *           example: 1
 *         product_id:
 *           type: integer
 *           example: 1
 *         cantidad:
 *           type: integer
 *           example: 2
 *         precio_unitario:
 *           type: number
 *           example: 45000.00
 *         subtotal:
 *           type: number
 *           example: 90000.00
 */
class SaleDetailRoutes {
    constructor() {
        this.saleDetailController = new sale_detail_controller_1.SaleDetailController();
    }
    routes(app) {
        for (const basePath of ["/api/detalle-ventas", "/api/detalles-venta"]) {
            app
                .route(basePath)
                .get(auth_middleware_1.verifyToken, this.saleDetailController.getAll.bind(this.saleDetailController))
                .post(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.saleDetailController.create.bind(this.saleDetailController));
            app
                .route(`${basePath}/:id`)
                .get(auth_middleware_1.verifyToken, this.saleDetailController.getOne.bind(this.saleDetailController))
                .patch(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.saleDetailController.update.bind(this.saleDetailController))
                .put(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.saleDetailController.update.bind(this.saleDetailController))
                .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.saleDetailController.remove.bind(this.saleDetailController));
            app
                .route(`${basePath}/:id/deactivate`)
                .patch(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.saleDetailController.deactivate.bind(this.saleDetailController));
        }
    }
}
exports.SaleDetailRoutes = SaleDetailRoutes;
//# sourceMappingURL=sale-detail.routes.js.map