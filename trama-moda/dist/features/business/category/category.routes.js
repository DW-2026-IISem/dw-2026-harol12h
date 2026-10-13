"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const category_controller_1 = require("./category.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
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
class CategoryRoutes {
    constructor() {
        this.categoryController = new category_controller_1.CategoryController();
    }
    routes(app) {
        /**
         * @openapi
         * /api/categorias:
         *   get:
         *     summary: Obtener categorías activas (público)
         *     tags: [Categories]
         *     security: []
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
            .post(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.categoryController.create.bind(this.categoryController));
        /**
         * @openapi
         * /api/categorias/{id}:
         *   get:
         *     summary: Obtener categoría por ID (público)
         *     tags: [Categories]
         *     security: []
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
            .put(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.categoryController.update.bind(this.categoryController))
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.categoryController.deleteLogical.bind(this.categoryController));
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
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.categoryController.deleteLogical.bind(this.categoryController))
            .patch(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.categoryController.deleteLogical.bind(this.categoryController));
    }
}
exports.CategoryRoutes = CategoryRoutes;
//# sourceMappingURL=category.routes.js.map