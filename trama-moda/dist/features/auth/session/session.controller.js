"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const auth_user_1 = require("../../../shared/auth/auth-user");
const session_service_1 = require("./session.service");
const service = new session_service_1.SessionService();
class SessionController extends base_controller_1.BaseController {
    constructor() {
        super(...arguments);
        this.login = async (req, res) => {
            await this.run(res, async () => {
                const session = await service.login(req.body?.username, req.body?.password, req.get("user-agent"));
                res.status(200).json(session);
            });
        };
        this.refresh = async (req, res) => {
            await this.run(res, async () => {
                const session = await service.refresh(req.body?.refreshToken, req.get("user-agent"));
                res.status(200).json(session);
            });
        };
        this.logout = async (req, res) => {
            await this.run(res, async () => {
                await service.logout(req.body?.refreshToken);
                res.status(200).json({ message: "Session revoked" });
            });
        };
        this.profile = async (req, res) => {
            await this.run(res, async () => {
                const user = (0, auth_user_1.requireAuthUser)(req);
                res.status(200).json(await service.profile(user.id));
            });
        };
        this.permissions = async (req, res) => {
            await this.run(res, async () => {
                const user = (0, auth_user_1.requireAuthUser)(req);
                res.status(200).json({ permissions: await service.myPermissions(user.id) });
            });
        };
        this.sessions = async (req, res) => {
            await this.run(res, async () => {
                const user = (0, auth_user_1.requireAuthUser)(req);
                res.status(200).json({ sessions: await service.mySessions(user.id) });
            });
        };
        this.revokeSessions = async (req, res) => {
            await this.run(res, async () => {
                const user = (0, auth_user_1.requireAuthUser)(req);
                const revoked = await service.revokeMySessions(user.id);
                res.status(200).json({ revoked });
            });
        };
    }
}
exports.SessionController = SessionController;
//# sourceMappingURL=session.controller.js.map