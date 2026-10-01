import { Application } from "express";
import { VariantController } from "./variant.controller";

/**
 * @openapi
 * components:
 *   schemas:
 *     Variant:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Talla M - Color Azul Marino"
 *         descripcion:
 *           type: string
 *           example: "Variante física de prenda talla M en tono azul"
 *         is_active:
 *           type: boolean
 *           example: true
 *     VariantInput:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Talla M - Color Azul Marino"
 *         descripcion:
 *           type: string
 *           example: "Variante física de prenda talla M en tono azul"
 */

export class VariantRoutes {
  public variantController: VariantController = new VariantController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/variantes:
     *   get:
     *     summary: Obtener todas las variantes activas
     *     tags: [Variants]
     *     responses:
     *       200:
     *         description: Lista de variantes
     *   post:
     *     summary: Crear una nueva variante
     *     tags: [Variants]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/VariantInput'
     *     responses:
     *       201:
     *         description: Variante creada exitosamente
     */
    app
      .route("/api/variantes")
      .get(this.variantController.getAll.bind(this.variantController))
      .post(this.variantController.create.bind(this.variantController));

    /**
     * @openapi
     * /api/variantes/{id}:
     *   get:
     *     summary: Obtener variante por ID
     *     tags: [Variants]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Variante encontrada
     *       404:
     *         description: Variante no encontrada
     *   put:
     *     summary: Actualizar variante por ID
     *     tags: [Variants]
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
     *             $ref: '#/components/schemas/VariantInput'
     *     responses:
     *       200:
     *         description: Variante actualizada
     */
    app
      .route("/api/variantes/:id")
      .get(this.variantController.getOne.bind(this.variantController))
      .put(this.variantController.update.bind(this.variantController));

    /**
     * @openapi
     * /api/variantes/{id}/deactivate:
     *   patch:
     *     summary: Desactivar variante (borrado lógico)
     *     tags: [Variants]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Variante desactivada
     */
    app
      .route("/api/variantes/:id/deactivate")
      .patch(this.variantController.deleteLogical.bind(this.variantController));
  }
}
