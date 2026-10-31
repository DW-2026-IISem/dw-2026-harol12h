import { Request, Response } from "express";
import { Transaction } from "sequelize";
import { sequelize } from "../../../database/db";
import { Branch } from "../branch/branch.model";
import { Sale } from "./sale.model";
import { Client } from "../client/client.model";
import { Inventory } from "../inventory/inventory.model";
import { Product } from "../product/product.model";
import { SaleDetail } from "../sale-detail/sale-detail.model";
import { Variant } from "../variants/variant.model";

interface RequestedItem {
  variantId: number;
  branchId: number;
  quantity: number;
}

interface SaleInventoryGroup extends RequestedItem {
  inventoryRows: Inventory[];
  product: Product;
}

interface CatalogRecord {
  variantId: number;
  branchId: number;
  stock: number;
  available: boolean;
  variant: { id: number; nombre: string };
  branch: { id: number; nombre: string };
  product: { id: number; nombre: string; precio: number | string } | null;
}

function positiveInteger(value: unknown): number | null {
  if (
    (typeof value !== "number" && typeof value !== "string") ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return null;
  }
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function nonNegativeNumber(value: unknown): number | null {
  if (
    (typeof value !== "number" && typeof value !== "string") ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function saleDetailsInclude() {
  return {
    model: SaleDetail,
    as: "details",
    where: { status: "active" },
    required: false,
    attributes: ["id", "product_id", "variantId", "branchId", "cantidad", "precio_unitario", "subtotal", "status"],
    include: [
      { model: Product, as: "product", attributes: ["id", "nombre", "precio"] },
      { model: Variant, as: "variant", attributes: ["id", "nombre"] },
      { model: Branch, as: "branch", attributes: ["id", "nombre"] },
    ],
  };
}

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
        include: [
          { model: Client, as: "client", attributes: ["id", "nombre", "numero_documento"] },
          saleDetailsInclude(),
        ],
        order: [["fecha", "DESC"], ["id", "DESC"]],
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
        include: [
          { model: Client, as: "client" },
          saleDetailsInclude(),
        ],
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

  public async getCatalog(req: Request, res: Response) {
    try {
      const inventories = await Inventory.findAll({
        where: { is_active: true },
        include: [
          {
            model: Variant,
            as: "variant",
            where: { is_active: true },
            required: true,
            attributes: ["id", "nombre", "product_id"],
            include: [
              {
                model: Product,
                as: "product",
                where: { status: "active" },
                required: false,
                attributes: ["id", "nombre", "precio"],
              },
            ],
          },
          {
            model: Branch,
            as: "branch",
            where: { is_active: true },
            required: true,
            attributes: ["id", "nombre"],
          },
        ],
        order: [["branchId", "ASC"], ["variantId", "ASC"], ["id", "ASC"]],
      });

      const catalog = new Map<string, CatalogRecord>();
      for (const inventory of inventories) {
        const row = inventory.get({ plain: true }) as Inventory & {
          variant: Variant & { product: Product | null };
          branch: Branch;
        };
        const variant = row.variant;
        const branch = row.branch;
        const product = variant.product;
        if (!branch || row.stock < 0) {
          continue;
        }
        const available = Boolean(variant.product_id && product);

        const key = `${variant.id}:${branch.id}`;
        const existing = catalog.get(key);
        if (existing) {
          existing.stock += row.stock;
        } else {
          catalog.set(key, {
            variantId: variant.id,
            branchId: branch.id,
            stock: row.stock,
            available,
            variant: { id: variant.id, nombre: variant.nombre },
            branch: { id: branch.id, nombre: branch.nombre },
            product: product
              ? {
                  id: product.id,
                  nombre: product.nombre,
                  precio: product.precio,
                }
              : null,
          });
        }
      }

      res.status(200).json({ items: [...catalog.values()] });
    } catch (error) {
      res.status(500).json({ error: "Error fetching sales catalog", detail: String(error) });
    }
  }

  // Creates the header, details, and variant/branch inventory changes atomically.
  public async create(req: Request, res: Response) {
    let transaction: Transaction | undefined;
    let transactionSettled = false;
    try {
      transaction = await sequelize.transaction();
      const body = req.body;
      const clientId = positiveInteger(body?.client_id);
      if (clientId === null) {
        await transaction.rollback();
        res.status(400).json({ error: "client_id debe ser un entero positivo." });
        return;
      }

      if (!Array.isArray(body?.items) || body.items.length === 0) {
        await transaction.rollback();
        res.status(400).json({ error: "La venta requiere al menos una línea de detalle." });
        return;
      }

      const taxRate = body.tax === undefined ? 0 : nonNegativeNumber(body.tax);
      const discounts = body.discounts === undefined ? 0 : nonNegativeNumber(body.discounts);
      if (taxRate === null || taxRate > 100) {
        await transaction.rollback();
        res.status(400).json({ error: "El impuesto debe ser un porcentaje entre 0 y 100." });
        return;
      }
      if (discounts === null) {
        await transaction.rollback();
        res.status(400).json({ error: "El descuento debe ser un valor numérico mayor o igual a cero." });
        return;
      }

      const requestedItems: RequestedItem[] = [];
      for (const [index, rawItem] of body.items.entries()) {
        const variantId = positiveInteger(rawItem?.variantId);
        const branchId = positiveInteger(rawItem?.branchId);
        const quantity = positiveInteger(rawItem?.quantity);
        if (variantId === null || branchId === null || quantity === null) {
          await transaction.rollback();
          res.status(400).json({
            error: `La línea ${index + 1} requiere variantId, branchId y quantity como enteros positivos.`,
          });
          return;
        }
        requestedItems.push({ variantId, branchId, quantity });
      }

      const client = await Client.findOne({
        where: { id: clientId, status: "active" },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!client) {
        await transaction.rollback();
        res.status(400).json({ error: "El cliente no existe o está inactivo." });
        return;
      }

      const groupedItems = new Map<string, RequestedItem>();
      for (const item of requestedItems) {
        const key = `${item.variantId}:${item.branchId}`;
        const existing = groupedItems.get(key);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          groupedItems.set(key, { ...item });
        }
      }

      const inventoryGroups: SaleInventoryGroup[] = [];
      for (const item of [...groupedItems.values()].sort(
        (left, right) =>
          left.variantId - right.variantId || left.branchId - right.branchId,
      )) {
        const variant = await Variant.findOne({
          where: { id: item.variantId, is_active: true },
          transaction,
          lock: transaction.LOCK.UPDATE,
        });
        if (!variant || variant.product_id === null) {
          await transaction.rollback();
          res.status(400).json({ error: `La variante ${item.variantId} no existe, está inactiva o no tiene producto.` });
          return;
        }

        const product = await Product.findOne({
          where: { id: variant.product_id, status: "active" },
          transaction,
          lock: transaction.LOCK.UPDATE,
        });
        if (!product) {
          await transaction.rollback();
          res.status(400).json({ error: `El producto de la variante ${item.variantId} no existe o está inactivo.` });
          return;
        }

        const branch = await Branch.findOne({
          where: { id: item.branchId, is_active: true },
          transaction,
          lock: transaction.LOCK.UPDATE,
        });
        if (!branch) {
          await transaction.rollback();
          res.status(400).json({ error: `La sucursal ${item.branchId} no existe o está inactiva.` });
          return;
        }

        const inventoryRows = await Inventory.findAll({
          where: {
            variantId: item.variantId,
            branchId: item.branchId,
            is_active: true,
          },
          order: [["id", "ASC"]],
          transaction,
          lock: transaction.LOCK.UPDATE,
        });
        const available = inventoryRows.reduce(
          (sum, inventory) => sum + inventory.stock,
          0,
        );
        if (inventoryRows.length === 0 || available < item.quantity) {
          await transaction.rollback();
          res.status(400).json({
            error: `Inventario insuficiente para ${variant.nombre} en ${branch.nombre}. Disponible: ${available}, solicitado: ${item.quantity}.`,
          });
          return;
        }

        inventoryGroups.push({ ...item, inventoryRows, product });
      }

      const lines = inventoryGroups.map((group) => {
        const unitPrice = Number(group.product.precio);
        return {
          ...group,
          unitPrice,
          subtotal: roundMoney(unitPrice * group.quantity),
        };
      });
      const subtotal = roundMoney(
        lines.reduce((sum, line) => sum + line.subtotal, 0),
      );
      const tax = roundMoney((subtotal * taxRate) / 100);
      if (discounts > subtotal + tax) {
        await transaction.rollback();
        res.status(400).json({ error: "El descuento no puede superar el subtotal más los impuestos." });
        return;
      }
      const total = roundMoney(subtotal + tax - discounts);

      const sale = await Sale.create(
        {
          client_id: clientId,
          monto_total: total,
          fecha: new Date(),
          status: "active",
        },
        { transaction },
      );
      const details: SaleDetail[] = [];
      for (const line of lines) {
        details.push(
          await SaleDetail.create(
            {
              sale_id: sale.id,
              product_id: line.product.id,
              variantId: line.variantId,
              branchId: line.branchId,
              cantidad: line.quantity,
              precio_unitario: line.unitPrice,
              subtotal: line.subtotal,
            },
            { transaction },
          ),
        );

        let remaining = line.quantity;
        for (const inventory of line.inventoryRows) {
          if (remaining === 0) {
            break;
          }
          const deducted = Math.min(inventory.stock, remaining);
          await inventory.update(
            { stock: inventory.stock - deducted },
            { transaction },
          );
          remaining -= deducted;
        }
      }

      await transaction.commit();
      transactionSettled = true;
      res.status(201).json({
        sale,
        details,
        totals: { subtotal, taxRate, tax, discounts, total },
      });
    } catch (error) {
      if (transaction && !transactionSettled) {
        await transaction.rollback();
      }
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
