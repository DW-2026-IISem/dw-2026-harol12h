"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionRoutes = void 0;
const collection_controller_1 = require("./collection.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
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
class CollectionRoutes {
    constructor() {
        this.collectionController = new collection_controller_1.CollectionController();
    }
    routes(app) {
        /**
         * @openapi
         * /api/colecciones:
         *   get:
         *     summary: Obtener colecciones activas (público)
         *     tags: [Collections]
         *     security: []
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
            .get(this.collectionController.getAll.bind(this.collectionController))
            .post(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.collectionController.create.bind(this.collectionController));
        /**
         * @openapi
         * /api/colecciones/{id}:
         *   get:
         *     summary: Obtener colección por ID (público)
         *     tags: [Collections]
         *     security: []
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
            .get(this.collectionController.getOne.bind(this.collectionController))
            .put(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR", "VENDEDOR"]), this.collectionController.update.bind(this.collectionController))
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.collectionController.deleteLogical.bind(this.collectionController));
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
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.collectionController.deleteLogical.bind(this.collectionController))
            .patch(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.collectionController.deleteLogical.bind(this.collectionController));
    }
}
exports.CollectionRoutes = CollectionRoutes;
//# sourceMappingURL=collection.routes.js.map