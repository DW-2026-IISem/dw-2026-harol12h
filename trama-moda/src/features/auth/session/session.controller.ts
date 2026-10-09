import { Request, Response } from "express";
import { BaseController } from "../../../shared/http/base-controller";
import { requireAuthUser } from "../../../shared/auth/auth-user";
import { SessionService } from "./session.service";

const service = new SessionService();

export class SessionController extends BaseController {
  login = async (req: Request, res: Response): Promise<void> => {
    await this.run(res, async () => {
      const session = await service.login(req.body?.username, req.body?.password, req.get("user-agent"));
      res.status(200).json(session);
    });
  };

  refresh = async (req: Request, res: Response): Promise<void> => {
    await this.run(res, async () => {
      const session = await service.refresh(req.body?.refreshToken, req.get("user-agent"));
      res.status(200).json(session);
    });
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    await this.run(res, async () => {
      await service.logout(req.body?.refreshToken);
      res.status(200).json({ message: "Session revoked" });
    });
  };

  profile = async (req: Request, res: Response): Promise<void> => {
    await this.run(res, async () => {
      const user = requireAuthUser(req);
      res.status(200).json(await service.profile(user.id));
    });
  };

  permissions = async (req: Request, res: Response): Promise<void> => {
    await this.run(res, async () => {
      const user = requireAuthUser(req);
      res.status(200).json({ permissions: await service.myPermissions(user.id) });
    });
  };

  sessions = async (req: Request, res: Response): Promise<void> => {
    await this.run(res, async () => {
      const user = requireAuthUser(req);
      res.status(200).json({ sessions: await service.mySessions(user.id) });
    });
  };

  revokeSessions = async (req: Request, res: Response): Promise<void> => {
    await this.run(res, async () => {
      const user = requireAuthUser(req);
      const revoked = await service.revokeMySessions(user.id);
      res.status(200).json({ revoked });
    });
  };
}
