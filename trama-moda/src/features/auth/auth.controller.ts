import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../business/user/user.model";
import { AuthRequest } from "../../middlewares/auth.middleware";

const JWT_SECRET = process.env.JWT_SECRET || "trama_moda_secret_key_2026";

export class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email y contraseña son obligatorios." });
        return;
      }

      const user = await User.findOne({ where: { email, is_active: true } });
      if (!user) {
        res.status(404).json({ error: "Credenciales inválidas." });
        return;
      }

      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        res.status(401).json({ error: "Credenciales inválidas." });
        return;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "8h" }
      );

      const userResponse = user.toJSON();
      delete userResponse.password;

      res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
        user: userResponse
      });
    } catch (error) {
      res.status(500).json({ error: "Error al iniciar sesión", detail: String(error) });
    }
  }

  public async profile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "No autenticado" });
        return;
      }

      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] }
      });

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener perfil", detail: String(error) });
    }
  }
}
