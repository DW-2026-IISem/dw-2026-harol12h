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
        where: { status: "active" },
      });
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: "Error fetching users", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const user = await User.findByPk(id);
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
      const body = req.body && typeof req.body === "object" ? req.body : {};
      const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      if (!nombre || nombre.length > 100) {
        res.status(400).json({ error: "nombre is required and must contain at most 100 characters" });
        return;
      }
      if (email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        res.status(400).json({ error: "email must be a valid address of at most 150 characters" });
        return;
      }
      if (await User.findOne({ where: { email } })) {
        res.status(409).json({ error: "Email is already in use" });
        return;
      }

      const user = await User.create({
        nombre,
        email,
        status: "active"
      });
      res.status(201).json({ user });
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
      const body = req.body && typeof req.body === "object" ? req.body : {};
      const updates: { nombre?: string; email?: string } = {};

      if (body.nombre !== undefined) {
        const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";
        if (!nombre || nombre.length > 100) {
          res.status(400).json({ error: "nombre must contain between 1 and 100 characters" });
          return;
        }
        updates.nombre = nombre;
      }
      if (body.email !== undefined) {
        const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
        if (email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          res.status(400).json({ error: "email must be a valid address of at most 150 characters" });
          return;
        }
        const duplicate = await User.findOne({ where: { email } });
        if (duplicate && duplicate.id !== user.id) {
          res.status(409).json({ error: "Email is already in use" });
          return;
        }
        updates.email = email;
      }
      if (Object.keys(updates).length === 0) {
        res.status(400).json({ error: "Provide nombre or email to update" });
        return;
      }
      await user.update(updates);

      res.status(200).json({ message: "User updated successfully", user });
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
      await user.update({ status: "inactive" });
      res.status(200).json({ message: "User record deactivated", user });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating user record", detail: String(error) });
    }
  }
}
