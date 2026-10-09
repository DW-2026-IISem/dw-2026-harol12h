import { Application } from "express";
import { CollectionController } from "./collection.controller";
import { checkRole, verifyToken } from "../../../middlewares/auth.middleware";

/**
 * @openapi
 * components:
 *   schemas:
 *     Collection:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Colección Primavera - Verano"
 *         descripcion:
 *           type: string
 *           example: "Ropa ligera y colores pasteles"
 *         is_active:
 *           type: boolean
 *           example: true
 *     CollectionInput:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Colección Primavera - Verano"
 *         descripcion:
 *           type: string
 *           example: "Ropa ligera y colores pasteles"
 */

export class CollectionRoutes {
  public collectionController: CollectionController = new CollectionController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/colecciones:
     *   get:
     *     summary: Obtener todas las colecciones activas
     *     tags: [Collections]
     *     responses:
     *       200:
     *         description: Lista de colecciones
     *   post:
     *     summary: Crear una nueva colección
     *     tags: [Collections]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CollectionInput'
     *     responses:
     *       201:
     *         description: Colección creada exitosamente
     */
    app
      .route("/api/colecciones")
      .get(verifyToken, this.collectionController.getAll.bind(this.collectionController))
      .post(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.collectionController.create.bind(this.collectionController));

    /**
     * @openapi
     * /api/colecciones/{id}:
     *   get:
     *     summary: Obtener colección por ID
     *     tags: [Collections]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Colección encontrada
     *       404:
     *         description: Colección no encontrada
     *   put:
     *     summary: Actualizar colección por ID
     *     tags: [Collections]
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
     *             $ref: '#/components/schemas/CollectionInput'
     *     responses:
     *       200:
     *         description: Colección actualizada
     */
    app
      .route("/api/colecciones/:id")
      .get(verifyToken, this.collectionController.getOne.bind(this.collectionController))
      .put(verifyToken, checkRole(["ADMINISTRADOR", "VENDEDOR"]), this.collectionController.update.bind(this.collectionController))
      .delete(verifyToken, checkRole(["ADMINISTRADOR"]), this.collectionController.deleteLogical.bind(this.collectionController));

    /**
     * @openapi
     * /api/colecciones/{id}/deactivate:
     *   patch:
     *     summary: Desactivar colección (borrado lógico)
     *     tags: [Collections]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Colección desactivada
     */
    app
      .route("/api/colecciones/:id/deactivate")
      .delete(verifyToken, checkRole(["ADMINISTRADOR"]), this.collectionController.deleteLogical.bind(this.collectionController))
      .patch(verifyToken, checkRole(["ADMINISTRADOR"]), this.collectionController.deleteLogical.bind(this.collectionController));
  }
}
