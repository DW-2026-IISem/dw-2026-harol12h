"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const session_controller_1 = require("./session/session.controller");
const access_1 = require("./access");
const router = (0, express_1.Router)();
const controller = new session_controller_1.SessionController();
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
router.get("/me", access_1.authenticate, controller.profile);
router.get("/permissions", access_1.authenticate, controller.permissions);
router.get("/sessions", access_1.authenticate, controller.sessions);
router.post("/sessions/revoke", access_1.authenticate, controller.revokeSessions);
class AuthRoutes {
    routes(app) {
        app.use("/api/sesion", router);
    }
}
exports.AuthRoutes = AuthRoutes;
exports.default = router;
//# sourceMappingURL=auth.routes.js.map