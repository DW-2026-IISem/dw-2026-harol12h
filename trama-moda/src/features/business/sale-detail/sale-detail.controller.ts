import { Request, Response } from "express";
import { Transaction } from "sequelize";
import { sequelize } from "../../../database/db";
import { Branch } from "../branch/branch.model";
import { Client } from "../client/client.model";
import { Inventory } from "../inventory/inventory.model";
import { Product } from "../product/product.model";
import { Sale } from "../sale/sale.model";
import { SaleDetail } from "./sale-detail.model";
import { Variant } from "../variants/variant.model";

type HttpError = { status: number; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
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

function routeId(req: Request): number | null {
  const raw = req.params.id;
  return positiveInteger(Array.isArray(raw) ? raw[0] : raw);
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function detailIncludes() {
  return [
    {
      model: Sale,
      as: "sale",
      include: [{ model: Client, as: "client", attributes: ["id", "nombre"] }],
    },
    { model: Product, as: "product", attributes: ["id", "nombre", "precio"] },
    { model: Variant, as: "variant", attributes: ["id", "nombre"] },
    { model: Branch, as: "branch", attributes: ["id", "nombre"] },
  ];
}

async function activeSubtotal(
  saleId: number,
  transaction: Transaction,
): Promise<number> {
  const result = await SaleDetail.sum("subtotal", {
    where: { sale_id: saleId, status: "active" },
    transaction,
  });
  return Number(result ?? 0);
}

async function lockInventory(
  variantId: number,
  branchId: number,
  transaction: Transaction,
): Promise<Inventory[]> {
  return Inventory.findAll({
    where: { variantId, branchId, is_active: true },
    order: [["id", "ASC"]],
    transaction,
    lock: transaction.LOCK.UPDATE,
  });
}

async function adjustInventory(
  rows: Inventory[],
  delta: number,
  transaction: Transaction,
): Promise<void> {
  if (delta === 0) {
    return;
  }
  if (rows.length === 0) {
    throw {
      status: delta > 0 ? 400 : 409,
      message: "No hay inventario activo para ajustar esta línea.",
    } satisfies HttpError;
  }

  if (delta < 0) {
    const available = rows.reduce((sum, row) => sum + row.stock, 0);
    if (available < -delta) {
      throw {
        status: 400,
        message: `Inventario insuficiente. Disponible: ${available}, solicitado: ${-delta}.`,
      } satisfies HttpError;
    }

    let remaining = -delta;
    for (const row of rows) {
      if (remaining === 0) {
        break;
      }
      const taken = Math.min(row.stock, remaining);
      await row.update({ stock: row.stock - taken }, { transaction });
      remaining -= taken;
    }
    return;
  }

  await rows[0].update(
    { stock: rows[0].stock + delta },
    { transaction },
  );
}

async function updateSaleTotal(
  sale: Sale,
  previousLinesTotal: number,
  nextLinesTotal: number,
  transaction: Transaction,
): Promise<void> {
  const existingAdjustments = Number(sale.monto_total) - previousLinesTotal;
  await sale.update(
    { monto_total: roundMoney(nextLinesTotal + existingAdjustments) },
    { transaction },
  );
}

function sendFailure(
  res: Response,
  error: unknown,
  fallback: string,
): void {
  if (isRecord(error) && typeof error.status === "number" && typeof error.message === "string") {
    res.status(error.status).json({ error: error.message });
    return;
  }
  res.status(500).json({ error: fallback, detail: String(error) });
}

async function finishTransaction(
  transaction: Transaction | undefined,
  error: unknown,
  res: Response,
  fallback: string,
): Promise<void> {
  if (transaction) {
    await transaction.rollback();
  }
  sendFailure(res, error, fallback);
}

async function loadEditableInventory(
  detail: SaleDetail,
  transaction: Transaction,
): Promise<Inventory[]> {
  if (detail.variantId === null || detail.branchId === null) {
    throw {
      status: 409,
      message: "Esta línea histórica no tiene variante y sucursal asociadas; no se puede ajustar inventario de forma segura.",
    } satisfies HttpError;
  }
  const variant = await Variant.findByPk(detail.variantId, {
    transaction,
    lock: transaction.LOCK.UPDATE,
  });
  if (!variant || variant.product_id !== detail.product_id) {
    throw {
      status: 409,
      message: "La variante ya no está asociada al producto registrado en esta línea.",
    } satisfies HttpError;
  }
  return lockInventory(detail.variantId, detail.branchId, transaction);
}

export class SaleDetailController {
  public async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const details = await SaleDetail.findAll({
        include: detailIncludes(),
        order: [["id", "DESC"]],
      });
      res.status(200).json({ details });
    } catch (error) {
      res.status(500).json({ error: "Error fetching sale details", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const id = routeId(req);
      if (id === null) {
        res.status(400).json({ error: "El id del detalle debe ser un entero positivo." });
        return;
      }
      const detail = await SaleDetail.findByPk(id, { include: detailIncludes() });
      if (!detail) {
        res.status(404).json({ error: "Sale detail not found" });
        return;
      }
      res.status(200).json({ detail });
    } catch (error) {
      res.status(500).json({ error: "Error fetching sale detail", detail: String(error) });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    let transaction: Transaction | undefined;
    try {
      const body = isRecord(req.body) ? req.body : null;
      if (!body) {
        res.status(400).json({ error: "El cuerpo de la solicitud debe ser un objeto." });
        return;
      }
      const allowedKeys = new Set(["sale_id", "variantId", "branchId", "quantity"]);
      if (Object.keys(body).some((key) => !allowedKeys.has(key))) {
        res.status(400).json({ error: "Solo se permiten sale_id, variantId, branchId y quantity." });
        return;
      }
      const saleId = positiveInteger(body.sale_id);
      const variantId = positiveInteger(body.variantId);
      const branchId = positiveInteger(body.branchId);
      const quantity = positiveInteger(body.quantity);
      if (saleId === null || variantId === null || branchId === null || quantity === null) {
        res.status(400).json({ error: "sale_id, variantId, branchId y quantity deben ser enteros positivos." });
        return;
      }

      transaction = await sequelize.transaction();
      const sale = await Sale.findByPk(saleId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!sale || sale.status !== "active") {
        throw { status: 400, message: "La venta no existe o está inactiva." } satisfies HttpError;
      }
      const variant = await Variant.findByPk(variantId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!variant || !variant.is_active || variant.product_id === null) {
        throw { status: 400, message: "La variante no existe, está inactiva o no tiene producto." } satisfies HttpError;
      }
      const product = await Product.findOne({
        where: { id: variant.product_id, status: "active" },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!product) {
        throw { status: 400, message: "El producto de la variante no existe o está inactivo." } satisfies HttpError;
      }
      const branch = await Branch.findByPk(branchId, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!branch || !branch.is_active) {
        throw { status: 400, message: "La sucursal no existe o está inactiva." } satisfies HttpError;
      }
      const inventory = await lockInventory(variantId, branchId, transaction);
      const available = inventory.reduce((sum, row) => sum + row.stock, 0);
      if (inventory.length === 0 || available < quantity) {
        throw {
          status: 400,
          message: `Inventario insuficiente. Disponible: ${available}, solicitado: ${quantity}.`,
        } satisfies HttpError;
      }

      const previousLinesTotal = await activeSubtotal(saleId, transaction);
      const unitPrice = Number(product.precio);
      const subtotal = roundMoney(unitPrice * quantity);
      const detail = await SaleDetail.create(
        {
          sale_id: saleId,
          product_id: product.id,
          variantId,
          branchId,
          cantidad: quantity,
          precio_unitario: unitPrice,
          subtotal,
          status: "active",
        },
        { transaction },
      );
      await adjustInventory(inventory, -quantity, transaction);
      await updateSaleTotal(
        sale,
        previousLinesTotal,
        previousLinesTotal + subtotal,
        transaction,
      );
      const created = await SaleDetail.findByPk(detail.id, {
        include: detailIncludes(),
        transaction,
      });
      await transaction.commit();
      transaction = undefined;
      res.status(201).json({ detail: created });
    } catch (error) {
      await finishTransaction(transaction, error, res, "Error creating sale detail");
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    let transaction: Transaction | undefined;
    try {
      const id = routeId(req);
      const body = isRecord(req.body) ? req.body : null;
      if (id === null || !body) {
        res.status(400).json({ error: "El id y el cuerpo de la solicitud son inválidos." });
        return;
      }
      if (
        Object.keys(body).length !== 1 ||
        !Object.prototype.hasOwnProperty.call(body, "quantity")
      ) {
        res.status(400).json({ error: "Solo se permite modificar quantity." });
        return;
      }
      const quantity = positiveInteger(body.quantity);
      if (quantity === null) {
        res.status(400).json({ error: "quantity debe ser un entero mayor o igual a 1." });
        return;
      }

      transaction = await sequelize.transaction();
      const detail = await SaleDetail.findByPk(id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!detail) {
        throw { status: 404, message: "Sale detail not found" } satisfies HttpError;
      }
      if (detail.status !== "active") {
        throw { status: 409, message: "No se puede editar un detalle inactivo." } satisfies HttpError;
      }
      const sale = await Sale.findByPk(detail.sale_id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!sale || sale.status !== "active") {
        throw { status: 409, message: "La venta no existe o está inactiva." } satisfies HttpError;
      }
      const inventory = await loadEditableInventory(detail, transaction);
      const delta = quantity - detail.cantidad;
      await adjustInventory(inventory, -delta, transaction);

      const previousLinesTotal = await activeSubtotal(sale.id, transaction);
      const previousDetailSubtotal = Number(detail.subtotal);
      const subtotal = roundMoney(Number(detail.precio_unitario) * quantity);
      await detail.update({ cantidad: quantity, subtotal }, { transaction });
      await updateSaleTotal(
        sale,
        previousLinesTotal,
        previousLinesTotal - previousDetailSubtotal + subtotal,
        transaction,
      );
      const updated = await SaleDetail.findByPk(detail.id, {
        include: detailIncludes(),
        transaction,
      });
      await transaction.commit();
      transaction = undefined;
      res.status(200).json({ detail: updated });
    } catch (error) {
      await finishTransaction(transaction, error, res, "Error updating sale detail");
    }
  }

  public async deactivate(req: Request, res: Response): Promise<void> {
    let transaction: Transaction | undefined;
    try {
      const id = routeId(req);
      if (id === null) {
        res.status(400).json({ error: "El id del detalle debe ser un entero positivo." });
        return;
      }
      transaction = await sequelize.transaction();
      const detail = await SaleDetail.findByPk(id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!detail) {
        throw { status: 404, message: "Sale detail not found" } satisfies HttpError;
      }
      if (detail.status !== "active") {
        throw { status: 409, message: "El detalle ya está inactivo." } satisfies HttpError;
      }
      const sale = await Sale.findByPk(detail.sale_id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!sale || sale.status !== "active") {
        throw { status: 409, message: "La venta no existe o está inactiva." } satisfies HttpError;
      }
      const inventory = await loadEditableInventory(detail, transaction);
      const previousLinesTotal = await activeSubtotal(sale.id, transaction);
      await adjustInventory(inventory, detail.cantidad, transaction);
      await detail.update({ status: "inactive" }, { transaction });
      await updateSaleTotal(
        sale,
        previousLinesTotal,
        previousLinesTotal - Number(detail.subtotal),
        transaction,
      );
      const updated = await SaleDetail.findByPk(detail.id, {
        include: detailIncludes(),
        transaction,
      });
      await transaction.commit();
      transaction = undefined;
      res.status(200).json({ detail: updated });
    } catch (error) {
      await finishTransaction(transaction, error, res, "Error deactivating sale detail");
    }
  }

  public async remove(req: Request, res: Response): Promise<void> {
    let transaction: Transaction | undefined;
    try {
      const id = routeId(req);
      if (id === null) {
        res.status(400).json({ error: "El id del detalle debe ser un entero positivo." });
        return;
      }
      transaction = await sequelize.transaction();
      const detail = await SaleDetail.findByPk(id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!detail) {
        throw { status: 404, message: "Sale detail not found" } satisfies HttpError;
      }
      if (detail.variantId === null || detail.branchId === null) {
        throw {
          status: 409,
          message: "Esta línea histórica no tiene variante y sucursal asociadas; no se puede eliminar de forma segura.",
        } satisfies HttpError;
      }
      const sale = await Sale.findByPk(detail.sale_id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!sale) {
        throw { status: 409, message: "La venta asociada no existe." } satisfies HttpError;
      }
      if (detail.status === "active") {
        if (sale.status !== "active") {
          throw { status: 409, message: "La venta está inactiva y no permite modificar sus líneas." } satisfies HttpError;
        }
        const inventory = await loadEditableInventory(detail, transaction);
        const previousLinesTotal = await activeSubtotal(sale.id, transaction);
        await adjustInventory(inventory, detail.cantidad, transaction);
        await updateSaleTotal(
          sale,
          previousLinesTotal,
          previousLinesTotal - Number(detail.subtotal),
          transaction,
        );
      }
      await detail.destroy({ transaction });
      await transaction.commit();
      transaction = undefined;
      res.status(200).json({ message: "Detalle eliminado", id });
    } catch (error) {
      await finishTransaction(transaction, error, res, "Error deleting sale detail");
    }
  }
}
