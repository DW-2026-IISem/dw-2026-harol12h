import { Application } from "express";
import { ProductController } from "./product.controller";

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Camiseta de Algodón"
 *         precio:
 *           type: number
 *           example: 45000.00
 *         stock:
 *           type: integer
 *           example: 50
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: active
 *     ProductInput:
 *       type: object
 *       required:
 *         - nombre
 *         - precio
 *       properties:
 *         nombre:
 *           type: string
 *           example: "Camiseta de Algodón"
 *         precio:
 *           type: number
 *           example: 45000.00
 *         stock:
 *           type: integer
 *           example: 50
 */

export class ProductRoutes {
  public productController: ProductController = new ProductController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/productos:
     *   get:
     *     summary: Obtener todos los productos activos
     *     tags: [Products]
     *     responses:
     *       200:
     *         description: Lista de productos obtenida con éxito
     *   post:
     *     summary: Crear un nuevo producto
     *     tags: [Products]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ProductInput'
     *     responses:
     *       201:
     *         description: Producto creado exitosamente
     */
    app
      .route("/api/productos")
      .get(this.productController.getAll.bind(this.productController))
      .post(this.productController.create.bind(this.productController));

    /**
     * @openapi
     * /api/productos/{id}:
     *   get:
     *     summary: Obtener un producto por ID
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Producto encontrado
     *       404:
     *         description: Producto no encontrado
     *   put:
     *     summary: Actualizar datos de un producto
     *     tags: [Products]
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
     *             $ref: '#/components/schemas/ProductInput'
     *     responses:
     *       200:
     *         description: Producto actualizado exitosamente
     */
    app
      .route("/api/productos/:id")
      .get(this.productController.getOne.bind(this.productController))
      .put(this.productController.update.bind(this.productController));

    /**
     * @openapi
     * /api/productos/{id}/deactivate:
     *   patch:
     *     summary: Desactivar (eliminación lógica) un producto
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Producto desactivado con éxito
     */
    app
      .route("/api/productos/:id/deactivate")
      .patch(this.productController.deleteLogical.bind(this.productController));
  }
}
