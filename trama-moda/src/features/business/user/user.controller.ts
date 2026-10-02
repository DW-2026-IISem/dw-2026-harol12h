import { Request, Response } from "express";
import { User } from "./user.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class UserController {
  public async getAll(req: Request, res: Response) {
    try {
      const users = await User.findAll({
        where: { is_active: true },
        attributes: { exclude: ["password"] }
      });
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: "Error fetching users", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] }
      });
      if (!user) {
        res.status(404).json({ error: "User record not found" });
        return;
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: "Error fetching user record", detail: String(error) });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, email, password, role, branchId } = req.body;
      const user = await User.create({
        name,
        email,
        password,
        role: role || "seller",
        branchId,
        is_active: true
      });

      const userResponse = user.toJSON();
      delete userResponse.password;

      res.status(201).json({ user: userResponse });
    } catch (error) {
      res.status(500).json({ error: "Error creating user record", detail: String(error) });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: "User record not found" });
        return;
      }
      await user.update(req.body);
      
      const userResponse = user.toJSON();
      delete userResponse.password;

      res.status(200).json({ message: "User updated successfully", user: userResponse });
    } catch (error) {
      res.status(500).json({ error: "Error updating user", detail: String(error) });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: "User record not found" });
        return;
      }
      await user.update({ is_active: false });
      
      const userResponse = user.toJSON();
      delete userResponse.password;

      res.status(200).json({ message: "User record deactivated", user: userResponse });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating user record", detail: String(error) });
    }
  }
}
