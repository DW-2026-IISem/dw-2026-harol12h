import { Request, Response } from "express";
import { Variant } from "./variant.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class VariantController {
  public async getAll(req: Request, res: Response) {
    try {
      const variants = await Variant.findAll({ where: { is_active: true } });
      res.status(200).json({ variants });
    } catch (error) {
      res.status(500).json({ error: "Error fetching variants", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const variant = await Variant.findByPk(id);
      if (!variant) {
        res.status(404).json({ error: "Variant not found" });
        return;
      }
      res.status(200).json({ variant });
    } catch (error) {
      res.status(500).json({ error: "Error fetching variant", detail: String(error) });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { nombre, descripcion } = req.body;
      const variant = await Variant.create({
        nombre,
        descripcion,
        is_active: true
      });
      res.status(201).json({ variant });
    } catch (error) {
      res.status(500).json({ error: "Error creating variant", detail: String(error) });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const variant = await Variant.findByPk(id);
      if (!variant) {
        res.status(404).json({ error: "Variant not found" });
        return;
      }
      await variant.update(req.body);
      res.status(200).json({ message: "Variant updated successfully", variant });
    } catch (error) {
      res.status(500).json({ error: "Error updating variant", detail: String(error) });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const variant = await Variant.findByPk(id);
      if (!variant) {
        res.status(404).json({ error: "Variant not found" });
        return;
      }
      await variant.update({ is_active: false });
      res.status(200).json({ message: "Variant deactivated", variant });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating variant", detail: String(error) });
    }
  }
}
