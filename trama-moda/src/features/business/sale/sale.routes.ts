import { Application } from "express";
import { SaleController } from "./sale.controller";

/**
 * @openapi
 * components:
 *   schemas:
 *     Sale:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         client_id:
 *           type: integer
 *           example: 1
 *         fecha:
 *           type: string
 *           format: date-time
 *         monto_total:
 *           type: number
 *           example: 150000.00
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: active
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
 *           example: 150000.00
 */

export class SaleRoutes {
  public saleController: SaleController = new SaleController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/ventas:
     *   get:
     *     summary: Obtener todas las ventas activas
     *     tags: [Sales]
     *     responses:
     *       200:
     *         description: Lista de ventas obtenida con éxito
     *   post:
     *     summary: Crear una nueva venta
     *     tags: [Sales]
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
      .get(this.saleController.getAll.bind(this.saleController))
      .post(this.saleController.create.bind(this.saleController));

    /**
     * @openapi
     * /api/ventas/{id}:
     *   get:
     *     summary: Obtener una venta por ID
     *     tags: [Sales]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Venta encontrada
     *       404:
     *         description: Venta no encontrada
     */
    app
      .route("/api/ventas/:id")
      .get(this.saleController.getOne.bind(this.saleController));

    /**
     * @openapi
     * /api/ventas/{id}/deactivate:
     *   patch:
     *     summary: Desactivar (eliminación lógica) una venta
     *     tags: [Sales]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Venta desactivada con éxito
     */
    app
      .route("/api/ventas/:id/deactivate")
      .patch(this.saleController.deleteLogical.bind(this.saleController));
  }
}
