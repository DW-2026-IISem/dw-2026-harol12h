import { Application } from "express";
import { AuthController } from "./auth.controller";
import { verifyToken } from "../../middlewares/auth.middleware";

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: "admin@tramamoda.com"
 *         password:
 *           type: string
 *           example: "SecurePass123!"
 */
export class AuthRoutes {
  public authController: AuthController = new AuthController();

  public routes(app: Application): void {
    /**
     * @openapi
     * /api/auth/login:
     *   post:
     *     summary: Iniciar sesión y obtener JWT token
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginInput'
     *     responses:
     *       200:
     *         description: Token generado exitosamente
     */
    app.route("/api/auth/login").post(this.authController.login.bind(this.authController));

    /**
     * @openapi
     * /api/auth/profile:
     *   get:
     *     summary: Obtener el perfil del usuario autenticado
     *     tags: [Auth]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Perfil devuelto
     */
    app.route("/api/auth/profile").get(verifyToken, this.authController.profile.bind(this.authController));
  }
}
