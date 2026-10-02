import { Request, Response } from "express";
import { Category } from "./category.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class CategoryController {
  public async getAll(req: Request, res: Response) {
    try {
      const categories = await Category.findAll({ where: { is_active: true } });
      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ error: "Error fetching categories", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const category = await Category.findByPk(id);
      if (!category) {
        res.status(404).json({ error: "Category record not found" });
        return;
      }
      res.status(200).json({ category });
    } catch (error) {
      res.status(500).json({ error: "Error fetching category record", detail: String(error) });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const category = await Category.create({
        name,
        description,
        is_active: true
      });
      res.status(201).json({ category });
    } catch (error) {
      res.status(500).json({ error: "Error creating category record", detail: String(error) });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const category = await Category.findByPk(id);
      if (!category) {
        res.status(404).json({ error: "Category record not found" });
        return;
      }
      await category.update(req.body);
      res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
      res.status(500).json({ error: "Error updating category", detail: String(error) });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const category = await Category.findByPk(id);
      if (!category) {
        res.status(404).json({ error: "Category record not found" });
        return;
      }
      await category.update({ is_active: false });
      res.status(200).json({ message: "Category record deactivated", category });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating category record", detail: String(error) });
    }
  }
}
