import { Application } from "express";
import { InventoryController } from "./inventory.controller";

/**
 * @openapi
 * components:
 *   schemas:
 *     Inventory:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         branchId:
 *           type: integer
 *           example: 1
 *         variantId:
 *           type: integer
 *           example: 1
 *         stock:
 *           type: integer
 *           example: 50
 *         is_active:
 *           type: boolean
 *           example: true
 *     InventoryInput:
 *       type: object
 *       required:
 *         - branchId
 *         - variantId
 *         - stock
 *       properties:
 *         branchId:
 *           type: integer
 *           example: 1
 *         variantId:
 *           type: integer
 *           example: 1
 *         stock:
 *           type: integer
 *           example: 50
 */

export class InventoryRoutes {
  public inventoryController: InventoryController = new InventoryController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/inventarios:
     *   get:
     *     summary: Obtener todo el inventario activo
     *     tags: [Inventories]
     *     responses:
     *       200:
     *         description: Lista de inventarios
     *   post:
     *     summary: Registrar stock en una sucursal para una variante
     *     tags: [Inventories]
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
      .get(this.inventoryController.getAll.bind(this.inventoryController))
      .post(this.inventoryController.create.bind(this.inventoryController));

    /**
     * @openapi
     * /api/inventarios/{id}:
     *   get:
     *     summary: Obtener registro de inventario por ID
     *     tags: [Inventories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Registro de inventario encontrado
     *       404:
     *         description: No encontrado
     *   put:
     *     summary: Actualizar stock/información de inventario
     *     tags: [Inventories]
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
      .get(this.inventoryController.getOne.bind(this.inventoryController))
      .put(this.inventoryController.update.bind(this.inventoryController));

    /**
     * @openapi
     * /api/inventarios/{id}/deactivate:
     *   patch:
     *     summary: Desactivar registro de inventario (borrado lógico)
     *     tags: [Inventories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Registro desactivado
     */
    app
      .route("/api/inventarios/:id/deactivate")
      .patch(this.inventoryController.deleteLogical.bind(this.inventoryController));
  }
}
