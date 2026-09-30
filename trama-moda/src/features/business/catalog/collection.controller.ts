import { Request, Response } from "express";
import { Collection } from "./collection.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class CollectionController {
  public async getAll(req: Request, res: Response) {
    try {
      const collections = await Collection.findAll({ where: { is_active: true } });
      res.status(200).json({ collections });
    } catch (error) {
      res.status(500).json({ error: "Error fetching collections", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const collection = await Collection.findByPk(id);
      if (!collection) {
        res.status(404).json({ error: "Collection not found" });
        return;
      }
      res.status(200).json({ collection });
    } catch (error) {
      res.status(500).json({ error: "Error fetching collection", detail: String(error) });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { nombre, descripcion } = req.body;
      const collection = await Collection.create({
        nombre,
        descripcion,
        is_active: true
      });
      res.status(201).json({ collection });
    } catch (error) {
      res.status(500).json({ error: "Error creating collection", detail: String(error) });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const collection = await Collection.findByPk(id);
      if (!collection) {
        res.status(404).json({ error: "Collection not found" });
        return;
      }
      await collection.update(req.body);
      res.status(200).json({ message: "Collection updated successfully", collection });
    } catch (error) {
      res.status(500).json({ error: "Error updating collection", detail: String(error) });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const collection = await Collection.findByPk(id);
      if (!collection) {
        res.status(404).json({ error: "Collection not found" });
        return;
      }
      await collection.update({ is_active: false });
      res.status(200).json({ message: "Collection deactivated", collection });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating collection", detail: String(error) });
    }
  }
}
