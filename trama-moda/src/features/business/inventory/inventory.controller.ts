import { Request, Response } from "express";
import { Inventory } from "./inventory.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class InventoryController {
  public async getAll(req: Request, res: Response) {
    try {
      const inventories = await Inventory.findAll({ where: { is_active: true } });
      res.status(200).json({ inventories });
    } catch (error) {
      res.status(500).json({ error: "Error fetching inventories", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const inventory = await Inventory.findByPk(id);
      if (!inventory) {
        res.status(404).json({ error: "Inventory record not found" });
        return;
      }
      res.status(200).json({ inventory });
    } catch (error) {
      res.status(500).json({ error: "Error fetching inventory record", detail: String(error) });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { branchId, variantId, stock } = req.body;
      const inventory = await Inventory.create({
        branchId,
        variantId,
        stock,
        is_active: true
      });
      res.status(201).json({ inventory });
    } catch (error) {
      res.status(500).json({ error: "Error creating inventory record", detail: String(error) });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const inventory = await Inventory.findByPk(id);
      if (!inventory) {
        res.status(404).json({ error: "Inventory record not found" });
        return;
      }
      await inventory.update(req.body);
      res.status(200).json({ message: "Inventory updated successfully", inventory });
    } catch (error) {
      res.status(500).json({ error: "Error updating inventory", detail: String(error) });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const inventory = await Inventory.findByPk(id);
      if (!inventory) {
        res.status(404).json({ error: "Inventory record not found" });
        return;
      }
      await inventory.update({ is_active: false });
      res.status(200).json({ message: "Inventory record deactivated", inventory });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating inventory record", detail: String(error) });
    }
  }
}
