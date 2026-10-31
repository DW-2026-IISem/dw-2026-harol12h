import { Application } from "express";
import { SaleDetailController } from "./sale-detail.controller";
import { checkRole, verifyToken } from "../../../middlewares/auth.middleware";

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

export class SaleDetailRoutes {
  public saleDetailController: SaleDetailController = new SaleDetailController();

  public routes(app: Application): void {
    for (const basePath of ["/api/detalle-ventas", "/api/detalles-venta"]) {
      app
        .route(basePath)
        .get(verifyToken, this.saleDetailController.getAll.bind(this.saleDetailController))
        .post(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.saleDetailController.create.bind(this.saleDetailController));

      app
        .route(`${basePath}/:id`)
        .get(verifyToken, this.saleDetailController.getOne.bind(this.saleDetailController))
        .patch(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.saleDetailController.update.bind(this.saleDetailController))
        .put(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.saleDetailController.update.bind(this.saleDetailController))
        .delete(verifyToken, checkRole(["ADMINISTRADOR"]), this.saleDetailController.remove.bind(this.saleDetailController));

      app
        .route(`${basePath}/:id/deactivate`)
        .patch(verifyToken, checkRole(["ADMINISTRADOR"]), this.saleDetailController.deactivate.bind(this.saleDetailController));
    }
  }
}
