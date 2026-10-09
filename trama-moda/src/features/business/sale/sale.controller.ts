import { Request, Response } from "express";
import { Sale } from "./sale.model";
import { Client } from "../client/client.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class SaleController {
  // GET ALL
  public async getAll(req: Request, res: Response) {
    try {
      const sales = await Sale.findAll({
        where: { status: "active" },
        include: [{ model: Client, as: "client", attributes: ["id", "nombre", "numero_documento"] }]
      });
      res.status(200).json({ sales });
    } catch (error) {
      res.status(500).json({ error: "Error fetching sales", detail: String(error) });
    }
  }

  // GET ONE
  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const sale = await Sale.findByPk(id, {
        include: [{ model: Client, as: "client" }]
      });

      if (!sale) {
        res.status(404).json({ error: "Sale not found" });
        return;
      }
      res.status(200).json({ sale });
    } catch (error) {
      res.status(500).json({ error: "Error fetching sale", detail: String(error) });
    }
  }

  // CREATE SALE (MAESTRO)
  public async create(req: Request, res: Response) {
    try {
      const { client_id, monto_total } = req.body;

      if (!client_id) {
        res.status(400).json({ error: "client_id is required" });
        return;
      }

      const client = await Client.findByPk(client_id);
      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }

      const sale = await Sale.create({
        client_id,
        monto_total: monto_total || 0,
        fecha: new Date(),
        status: "active"
      });

      res.status(201).json({ sale });
    } catch (error) {
      res.status(500).json({ error: "Error creating sale", detail: String(error) });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = paramId(req);
      if (!Number.isInteger(id) || id < 1) {
        res.status(400).json({ error: "Invalid sale id" });
        return;
      }

      const sale = await Sale.findByPk(id);
      if (!sale) {
        res.status(404).json({ error: "Sale not found" });
        return;
      }

      const clientId = Number(req.body.client_id);
      if (!Number.isInteger(clientId) || clientId < 1) {
        res.status(400).json({ error: "client_id must be a positive integer" });
        return;
      }
      const client = await Client.findByPk(clientId);
      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }

      await sale.update({ client_id: clientId });
      res.status(200).json({ message: "Sale updated", sale });
    } catch (error) {
      res.status(500).json({ error: "Error updating sale", detail: String(error) });
    }
  }

  // DELETE LOGICAL
  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      if (!Number.isInteger(id) || id < 1) {
        res.status(400).json({ error: "Invalid sale id" });
        return;
      }
      const sale = await Sale.findByPk(id);
      if (!sale) {
        res.status(404).json({ error: "Sale not found" });
        return;
      }
      await sale.update({ status: "inactive" });
      res.status(200).json({ message: "Sale deactivated", sale });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating sale", detail: String(error) });
    }
  }
}
