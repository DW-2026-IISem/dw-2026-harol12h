import { Application } from "express";
import { CategoryController } from "./category.controller";

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Ropa Formal"
 *         description:
 *           type: string
 *           example: "Trajes, blazers y prendas de gala"
 *         is_active:
 *           type: boolean
 *           example: true
 *     CategoryInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Ropa Formal"
 *         description:
 *           type: string
 *           example: "Trajes, blazers y prendas de gala"
 */
export class CategoryRoutes {
  public categoryController: CategoryController = new CategoryController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/categorias:
     *   get:
     *     summary: Obtener todas las categorías activas
     *     tags: [Categories]
     *     responses:
     *       200:
     *         description: Lista de categorías
     *   post:
     *     summary: Registrar una nueva categoría
     *     tags: [Categories]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CategoryInput'
     *     responses:
     *       201:
     *         description: Categoría creada exitosamente
     */
    app
      .route("/api/categorias")
      .get(this.categoryController.getAll.bind(this.categoryController))
      .post(this.categoryController.create.bind(this.categoryController));

    /**
     * @openapi
     * /api/categorias/{id}:
     *   get:
     *     summary: Obtener categoría por ID
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Categoría encontrada
     *       404:
     *         description: No encontrada
     *   put:
     *     summary: Actualizar información de una categoría
     *     tags: [Categories]
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
     *             $ref: '#/components/schemas/CategoryInput'
     *     responses:
     *       200:
     *         description: Categoría actualizada
     */
    app
      .route("/api/categorias/:id")
      .get(this.categoryController.getOne.bind(this.categoryController))
      .put(this.categoryController.update.bind(this.categoryController));

    /**
     * @openapi
     * /api/categorias/{id}/deactivate:
     *   patch:
     *     summary: Desactivar categoría (borrado lógico)
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Categoría desactivada
     */
    app
      .route("/api/categorias/:id/deactivate")
      .patch(this.categoryController.deleteLogical.bind(this.categoryController));
  }
}
