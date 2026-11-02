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
      const includeInactive =
        req.query.all === "true" || req.query.include_inactive === "true";
      const where = includeInactive ? {} : { is_active: true };
      const suppliers = await Supplier.findAll({ where });
      res.status(200).json({ suppliers });
    } catch (error) {
      res.status(500).json({ error: "Error fetching suppliers", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "El identificador del proveedor debe ser un entero positivo." });
        return;
      }
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
      if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        res.status(400).json({ error: "El cuerpo de la solicitud debe ser un objeto válido." });
        return;
      }

      const { name, contact_name, email, phone, address, is_active } = req.body;

      if (!name || typeof name !== "string" || name.trim() === "") {
        res.status(400).json({ error: "El nombre del proveedor es obligatorio." });
        return;
      }

      const supplier = await Supplier.create({
        name: name.trim(),
        contact_name: typeof contact_name === "string" ? contact_name.trim() : null,
        email: typeof email === "string" ? email.trim() : null,
        phone: typeof phone === "string" ? phone.trim() : null,
        address: typeof address === "string" ? address.trim() : null,
        is_active: typeof is_active === "boolean" ? is_active : true,
      });

      res.status(201).json({ supplier });
    } catch (error) {
      res.status(500).json({ error: "Error creating supplier record", detail: String(error) });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = paramId(req);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "El identificador del proveedor debe ser un entero positivo." });
        return;
      }

      if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        res.status(400).json({ error: "El cuerpo de la solicitud debe ser un objeto válido." });
        return;
      }

      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        res.status(404).json({ error: "Supplier record not found" });
        return;
      }

      if (req.body.name !== undefined) {
        if (typeof req.body.name !== "string" || req.body.name.trim() === "") {
          res.status(400).json({ error: "El nombre del proveedor no puede estar vacío." });
          return;
        }
        req.body.name = req.body.name.trim();
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
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "El identificador del proveedor debe ser un entero positivo." });
        return;
      }

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

  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ error: "El identificador del proveedor debe ser un entero positivo." });
        return;
      }

      const supplier = await Supplier.findByPk(id);
      if (!supplier) {
        res.status(404).json({ error: "Supplier record not found" });
        return;
      }
      await supplier.destroy();
      res.status(200).json({ message: "Supplier permanently deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting supplier record", detail: String(error) });
    }
  }
}
