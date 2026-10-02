import { Request, Response } from "express";
import { Supplier } from "./supplier.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class SupplierController {
  public async getAll(req: Request, res: Response) {
    try {
      const suppliers = await Supplier.findAll({ where: { is_active: true } });
      res.status(200).json({ suppliers });
    } catch (error) {
      res.status(500).json({ error: "Error fetching suppliers", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        res.status(404).json({ error: "Supplier record not found" });
        return;
      }
      res.status(200).json({ supplier });
    } catch (error) {
      res.status(500).json({ error: "Error fetching supplier record", detail: String(error) });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, contact_name, email, phone, address } = req.body;
      const supplier = await Supplier.create({
        name,
        contact_name,
        email,
        phone,
        address,
        is_active: true
      });
      res.status(201).json({ supplier });
    } catch (error) {
      res.status(500).json({ error: "Error creating supplier record", detail: String(error) });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        res.status(404).json({ error: "Supplier record not found" });
        return;
      }
      await supplier.update(req.body);
      res.status(200).json({ message: "Supplier updated successfully", supplier });
    } catch (error) {
      res.status(500).json({ error: "Error updating supplier", detail: String(error) });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        res.status(404).json({ error: "Supplier record not found" });
        return;
      }
      await supplier.update({ is_active: false });
      res.status(200).json({ message: "Supplier record deactivated", supplier });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating supplier record", detail: String(error) });
    }
  }
}
