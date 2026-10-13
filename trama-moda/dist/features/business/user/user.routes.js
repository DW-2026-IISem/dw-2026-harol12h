"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Laura Martínez"
 *         email:
 *           type: string
 *           example: "admin@tramamoda.com"
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: "active"
 *     UserInput:
 *       type: object
 *       required: [nombre, email]
 *       properties:
 *         nombre:
 *           type: string
 *           maxLength: 100
 *           example: "Laura Martínez"
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 150
 *           example: "laura.martinez@example.com"
 *     UserUpdate:
 *       type: object
 *       minProperties: 1
 *       properties:
 *         nombre:
 *           type: string
 *           maxLength: 100
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 150
 */
class UserRoutes {
    constructor() {
        this.userController = new user_controller_1.UserController();
    }
    routes(app) {
        /**
         * @openapi
         * /api/usuarios:
         *   get:
         *     summary: Obtener todos los usuarios (Solo Admin)
         *     tags: [Users]
         *     security:
         *       - bearerAuth: []
         *     responses:
         *       200:
         *         description: Lista de usuarios registrados
         *       401:
         *         description: No autorizado
         *       403:
         *         description: Requiere rol admin
         *   post:
         *     summary: Crear un nuevo usuario (Solo Admin)
         *     tags: [Users]
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *               $ref: '#/components/schemas/UserInput'
         *     responses:
         *       201:
         *         description: Usuario creado
         */
        app
            .route("/api/usuarios")
            .get(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.userController.getAll.bind(this.userController))
            .post(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.userController.create.bind(this.userController));
        /**
         * @openapi
         * /api/usuarios/{id}:
         *   get:
         *     summary: Obtener usuario por ID (Solo Admin)
         *     tags: [Users]
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
         *         description: Usuario encontrado
         *   put:
         *     summary: Actualizar usuario (Solo Admin)
         *     tags: [Users]
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
         *         description: Usuario actualizado
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/UserUpdate'
         */
        app
            .route("/api/usuarios/:id")
            .get(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.userController.getOne.bind(this.userController))
            .put(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.userController.update.bind(this.userController))
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.userController.deleteLogical.bind(this.userController));
        /**
         * @openapi
         * /api/usuarios/{id}/deactivate:
         *   patch:
         *     summary: Desactivar usuario (Solo Admin)
         *     tags: [Users]
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
         *         description: Usuario desactivado
         */
        app
            .route("/api/usuarios/:id/deactivate")
            .delete(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.userController.deleteLogical.bind(this.userController))
            .patch(auth_middleware_1.verifyToken, (0, auth_middleware_1.checkRole)(["ADMINISTRADOR"]), this.userController.deleteLogical.bind(this.userController));
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.routes.js.map