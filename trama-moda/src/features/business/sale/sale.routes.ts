import { Application } from "express";
import { SaleController } from "./sale.controller";
import { checkRole, verifyToken } from "../../../middlewares/auth.middleware";

/**
 * @openapi
 * components:
 *   schemas:
 *     SaleInput:
 *       type: object
 *       required:
 *         - clientId
 *         - branchId
 *         - total
 *       properties:
 *         clientId:
 *           type: integer
 *           example: 1
 *         branchId:
 *           type: integer
 *           example: 1
 *         total:
 *           type: number
 *           example: 150000
 */
export class SaleRoutes {
  public saleController: SaleController = new SaleController();

  public routes(app: Application): void {
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
      .get(verifyToken, this.saleController.getAll.bind(this.saleController))
      .post(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.saleController.create.bind(this.saleController));

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
      .get(verifyToken, this.saleController.getOne.bind(this.saleController))
      .put(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.saleController.update.bind(this.saleController))
      .delete(verifyToken, checkRole(["ADMINISTRADOR"]), this.saleController.deleteLogical.bind(this.saleController));

    app
      .route("/api/ventas/:id/deactivate")
      .patch(verifyToken, checkRole(["ADMINISTRADOR"]), this.saleController.deleteLogical.bind(this.saleController));
  }
}
