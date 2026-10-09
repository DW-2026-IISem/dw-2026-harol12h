import { Application, Router } from "express";
import { SessionController } from "./session/session.controller";
import { authenticate } from "./access";

const router = Router();
const controller = new SessionController();

/**
 * @openapi
 * /api/sesion/login:
 *   post:
 *     summary: Iniciar sesión
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password]
 *             properties:
 *               username: { type: string }
 *               password: { type: string, format: password }
 *     responses:
 *       200:
 *         description: Sesión creada con tokens de acceso y renovación
 *       401:
 *         description: Credenciales inválidas
 * /api/sesion/refresh:
 *   post:
 *     summary: Renovar tokens y rotar el refresh token
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken: { type: string }
 *     responses:
 *       200:
 *         description: Tokens rotados
 *       401:
 *         description: Refresh token inválido, vencido o reutilizado
 * /api/sesion/logout:
 *   post:
 *     summary: Revocar una sesión
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken: { type: string }
 *     responses:
 *       200:
 *         description: Sesión revocada
 */
router.post("/login", controller.login);
router.post("/refresh", controller.refresh);
router.post("/logout", controller.logout);

/**
 * @openapi
 * /api/sesion/me:
 *   get:
 *     summary: Consultar el perfil de la sesión actual
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil autenticado
 *       401:
 *         description: No autenticado
 * /api/sesion/permissions:
 *   get:
 *     summary: Consultar permisos efectivos de la sesión
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Permisos efectivos
 * /api/sesion/sessions:
 *   get:
 *     summary: Listar sesiones de la cuenta actual
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesiones sin incluir los refresh token hashes
 * /api/sesion/sessions/revoke:
 *   post:
 *     summary: Revocar todas las sesiones de la cuenta actual
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesiones revocadas
 */
router.get("/me", authenticate, controller.profile);
router.get("/permissions", authenticate, controller.permissions);
router.get("/sessions", authenticate, controller.sessions);
router.post("/sessions/revoke", authenticate, controller.revokeSessions);

export class AuthRoutes {
  public routes(app: Application): void {
    app.use("/api/sesion", router);
  }
}

export default router;