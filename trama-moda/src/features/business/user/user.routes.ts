import { Application } from "express";
import { UserController } from "./user.controller";
import { verifyToken, checkRole } from "../../../middlewares/auth.middleware";

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
export class UserRoutes {
  public userController: UserController = new UserController();

  public routes(app: Application): void {
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
      .get(verifyToken, checkRole(["ADMINISTRADOR"]), this.userController.getAll.bind(this.userController))
      .post(verifyToken, checkRole(["ADMINISTRADOR"]), this.userController.create.bind(this.userController));

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
      .get(verifyToken, checkRole(["ADMINISTRADOR"]), this.userController.getOne.bind(this.userController))
      .put(verifyToken, checkRole(["ADMINISTRADOR"]), this.userController.update.bind(this.userController))
      .delete(verifyToken, checkRole(["ADMINISTRADOR"]), this.userController.deleteLogical.bind(this.userController));

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
      .delete(verifyToken, checkRole(["ADMINISTRADOR"]), this.userController.deleteLogical.bind(this.userController))
      .patch(verifyToken, checkRole(["ADMINISTRADOR"]), this.userController.deleteLogical.bind(this.userController));
  }
}
