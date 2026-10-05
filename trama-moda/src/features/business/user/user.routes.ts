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
 *         name:
 *           type: string
 *           example: "Admin Principal"
 *         email:
 *           type: string
 *           example: "admin@tramamoda.com"
 *         role:
 *           type: string
 *           example: "admin"
 *         is_active:
 *           type: boolean
 *           example: true
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
     *             type: object
     *             required:
     *               - name:
     *               - email
     *               - password
     *               - role
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               role:
     *                 type: string
     *                 enum: [admin, seller]
     *     responses:
     *       201:
     *         description: Usuario creado
     */
    app
      .route("/api/usuarios")
      .get(verifyToken, checkRole(["admin"]), this.userController.getAll.bind(this.userController))
      .post(verifyToken, checkRole(["admin"]), this.userController.create.bind(this.userController));

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
     */
    app
      .route("/api/usuarios/:id")
      .get(verifyToken, checkRole(["admin"]), this.userController.getOne.bind(this.userController))
      .put(verifyToken, checkRole(["admin"]), this.userController.update.bind(this.userController));

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
      .patch(verifyToken, checkRole(["admin"]), this.userController.deleteLogical.bind(this.userController));
  }
}
