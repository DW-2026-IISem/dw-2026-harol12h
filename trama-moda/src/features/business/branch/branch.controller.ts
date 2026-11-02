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
      const includeInactive =
        req.query.all === "true" || req.query.include_inactive === "true";
      const where = includeInactive ? {} : { is_active: true };
      const branches = await Branch.findAll({ where });
      res.status(200).json({ branches });
    } catch (error) {
      res.status(500).json({ error: "Error fetching branches", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "El identificador de la sucursal debe ser un entero positivo." });
        return;
      }
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
      if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        res.status(400).json({ error: "El cuerpo de la solicitud debe ser un objeto válido." });
        return;
      }

      const { nombre, direccion, telefono, is_active } = req.body;

      if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
        res.status(400).json({ error: "El nombre de la sucursal es obligatorio." });
        return;
      }

      const branch = await Branch.create({
        nombre: nombre.trim(),
        direccion: typeof direccion === "string" ? direccion.trim() : null,
        telefono: typeof telefono === "string" ? telefono.trim() : null,
        is_active: typeof is_active === "boolean" ? is_active : true,
      });

      res.status(201).json({ branch });
    } catch (error) {
      res.status(500).json({ error: "Error creating branch", detail: String(error) });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = paramId(req);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "El identificador de la sucursal debe ser un entero positivo." });
        return;
      }

      if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        res.status(400).json({ error: "El cuerpo de la solicitud debe ser un objeto válido." });
        return;
      }

      const branch = await Branch.findByPk(id);
      if (!branch) {
        res.status(404).json({ error: "Branch not found" });
        return;
      }

      if (req.body.nombre !== undefined) {
        if (typeof req.body.nombre !== "string" || req.body.nombre.trim() === "") {
          res.status(400).json({ error: "El nombre de la sucursal no puede estar vacío." });
          return;
        }
        req.body.nombre = req.body.nombre.trim();
      }

      if (req.body.direccion !== undefined && typeof req.body.direccion === "string") {
        req.body.direccion = req.body.direccion.trim() || null;
      }

      if (req.body.telefono !== undefined && typeof req.body.telefono === "string") {
        req.body.telefono = req.body.telefono.trim() || null;
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
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "El identificador de la sucursal debe ser un entero positivo." });
        return;
      }

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
