import { Application } from "express";
import { UserController } from "./user.controller";

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
 *           example: "Laura Martínez"
 *         email:
 *           type: string
 *           example: "laura.martinez@tramamoda.com"
 *         role:
 *           type: string
 *           example: "admin"
 *         branchId:
 *           type: integer
 *           example: 1
 *         is_active:
 *           type: boolean
 *           example: true
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: "Laura Martínez"
 *         email:
 *           type: string
 *           example: "laura.martinez@tramamoda.com"
 *         password:
 *           type: string
 *           example: "SecurePass123!"
 *         role:
 *           type: string
 *           example: "admin"
 *         branchId:
 *           type: integer
 *           example: 1
 */
export class UserRoutes {
  public userController: UserController = new UserController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/usuarios:
     *   get:
     *     summary: Obtener todos los usuarios activos
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Lista de usuarios
     *   post:
     *     summary: Registrar un nuevo usuario
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserInput'
     *     responses:
     *       201:
     *         description: Usuario creado exitosamente
     */
    app
      .route("/api/usuarios")
      .get(this.userController.getAll.bind(this.userController))
      .post(this.userController.create.bind(this.userController));

    /**
     * @openapi
     * /api/usuarios/{id}:
     *   get:
     *     summary: Obtener usuario por ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Usuario encontrado
     *       404:
     *         description: No encontrado
     *   put:
     *     summary: Actualizar información de usuario
     *     tags: [Users]
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
     *             $ref: '#/components/schemas/UserInput'
     *     responses:
     *       200:
     *         description: Usuario actualizado
     */
    app
      .route("/api/usuarios/:id")
      .get(this.userController.getOne.bind(this.userController))
      .put(this.userController.update.bind(this.userController));

    /**
     * @openapi
     * /api/usuarios/{id}/deactivate:
     *   patch:
     *     summary: Desactivar usuario (borrado lógico)
     *     tags: [Users]
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
      .patch(this.userController.deleteLogical.bind(this.userController));
  }
}
