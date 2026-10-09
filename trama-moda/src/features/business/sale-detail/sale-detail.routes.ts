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
 *     SaleDetailInput:
 *       type: object
 *       required:
 *         - sale_id
 *         - product_id
 *         - cantidad
 *       properties:
 *         sale_id:
 *           type: integer
 *           example: 1
 *         product_id:
 *           type: integer
 *           example: 1
 *         cantidad:
 *           type: integer
 *           example: 2
 */

export class SaleDetailRoutes {
  public saleDetailController: SaleDetailController = new SaleDetailController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/detalles-venta:
     *   get:
     *     summary: Obtener todos los detalles de venta
     *     tags: [SaleDetails]
     *     responses:
     *       200:
     *         description: Lista de detalles obtenida con éxito
     *   post:
     *     summary: Crear un nuevo detalle de venta (Descuenta stock)
     *     tags: [SaleDetails]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/SaleDetailInput'
     *     responses:
     *       201:
     *         description: Detalle creado y stock descontado exitosamente
     */
    app
      .route("/api/detalles-venta")
      .get(verifyToken, this.saleDetailController.getAll.bind(this.saleDetailController))
      .post(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.saleDetailController.create.bind(this.saleDetailController));

    /**
     * @openapi
     * /api/detalles-venta/{id}:
     *   get:
     *     summary: Obtener un detalle de venta por ID
     *     tags: [SaleDetails]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Detalle encontrado
     *       404:
     *         description: Detalle no encontrado
     */
    app
      .route("/api/detalles-venta/:id")
      .get(verifyToken, this.saleDetailController.getOne.bind(this.saleDetailController))
      .put(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.saleDetailController.update.bind(this.saleDetailController))
      .delete(verifyToken, checkRole(["ADMINISTRADOR"]), this.saleDetailController.remove.bind(this.saleDetailController));
  }
}
