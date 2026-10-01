import { Request, Response } from "express";
import { Branch } from "./branch.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class BranchController {
  public async getAll(req: Request, res: Response) {
    try {
      const branches = await Branch.findAll({ where: { is_active: true } });
      res.status(200).json({ branches });
    } catch (error) {
      res.status(500).json({ error: "Error fetching branches", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const branch = await Branch.findByPk(id);
      if (!branch) {
        res.status(404).json({ error: "Branch not found" });
        return;
      }
      res.status(200).json({ branch });
    } catch (error) {
      res.status(500).json({ error: "Error fetching branch", detail: String(error) });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { nombre, direccion, telefono } = req.body;
      const branch = await Branch.create({
        nombre,
        direccion,
        telefono,
        is_active: true
      });
      res.status(201).json({ branch });
    } catch (error) {
      res.status(500).json({ error: "Error creating branch", detail: String(error) });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const branch = await Branch.findByPk(id);
      if (!branch) {
        res.status(404).json({ error: "Branch not found" });
        return;
      }
      await branch.update(req.body);
      res.status(200).json({ message: "Branch updated successfully", branch });
    } catch (error) {
      res.status(500).json({ error: "Error updating branch", detail: String(error) });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const branch = await Branch.findByPk(id);
      if (!branch) {
        res.status(404).json({ error: "Branch not found" });
        return;
      }
      await branch.update({ is_active: false });
      res.status(200).json({ message: "Branch deactivated", branch });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating branch", detail: String(error) });
    }
  }
}
