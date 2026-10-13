"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantRoutes = void 0;
const variant_controller_1 = require("./variant.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
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
class VariantRoutes {
    constructor() {
        this.variantController = new variant_controller_1.VariantController();
    }
    routes(app) {
        /**
         * @openapi
         * /api/variantes:
         *   get:
         *     summary: Obtener variantes activas (público)
         *     tags: [Variants]
         *     security: []
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
            .post(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.variantController.create.bind(this.variantController));
        /**
         * @openapi
         * /api/variantes/{id}:
         *   get:
         *     summary: Obtener variante por ID (público)
         *     tags: [Variants]
         *     security: []
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
            .put(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.variantController.update.bind(this.variantController))
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.variantController.deleteLogical.bind(this.variantController));
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
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.variantController.deleteLogical.bind(this.variantController))
            .patch(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.variantController.deleteLogical.bind(this.variantController));
    }
}
exports.VariantRoutes = VariantRoutes;
//# sourceMappingURL=variant.routes.js.map