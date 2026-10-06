import { Application } from "express";
import { InventoryController } from "./inventory.controller";
import { verifyToken, checkRole } from "../../../middlewares/auth.middleware";

/**
 * @openapi
 * components:
 *   schemas:
 *     InventoryInput:
 *       type: object
 *       required:
 *         - variantId
 *         - branchId
 *         - stock
 *       properties:
 *         variantId:
 *           type: integer
 *           example: 1
 *         branchId:
 *           type: integer
 *           example: 1
 *         stock:
 *           type: integer
 *           example: 50
 *         min_stock:
 *           type: integer
 *           example: 5
 */
export class InventoryRoutes {
  public inventoryController: InventoryController = new InventoryController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/inventarios:
     *   get:
     *     summary: Obtener todo el inventario (Solo Admin)
     *     tags: [Inventories]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de registros de inventario
     *       401:
     *         description: No autorizado
     *       403:
     *         description: Requiere rol admin
     *   post:
     *     summary: Registrar stock en inventario (Solo Admin)
     *     tags: [Inventories]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/InventoryInput'
     *     responses:
     *       201:
     *         description: Registro de inventario creado
     */
    app
      .route("/api/inventarios")
      .get(verifyToken, checkRole(["admin"]), this.inventoryController.getAll.bind(this.inventoryController))
      .post(verifyToken, checkRole(["admin"]), this.inventoryController.create.bind(this.inventoryController));

    /**
     * @openapi
     * /api/inventarios/{id}:
     *   get:
     *     summary: Obtener registro de inventario por ID (Solo Admin)
     *     tags: [Inventories]
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
     *         description: Registro encontrado
     *   put:
     *     summary: Actualizar stock de inventario (Solo Admin)
     *     tags: [Inventories]
     *     security:
     *       - bearerAuth: []
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
     *             $ref: '#/components/schemas/InventoryInput'
     *     responses:
     *       200:
     *         description: Inventario actualizado
     */
    app
      .route("/api/inventarios/:id")
      .get(verifyToken, checkRole(["admin"]), this.inventoryController.getOne.bind(this.inventoryController))
      .put(verifyToken, checkRole(["admin"]), this.inventoryController.update.bind(this.inventoryController));
  }
}
