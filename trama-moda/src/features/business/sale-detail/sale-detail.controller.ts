import { Request, Response } from "express";
import { sequelize } from "../../../database/db";
import { SaleDetail } from "./sale-detail.model";
import { Sale } from "../sale/sale.model";
import { Product } from "../product/product.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class SaleDetailController {
  // GET ALL DETAILS
  public async getAll(req: Request, res: Response) {
    try {
      const details = await SaleDetail.findAll({
        include: [
          { model: Sale, as: "sale" },
          { model: Product, as: "product", attributes: ["id", "nombre", "precio"] }
        ]
      });
      res.status(200).json({ details });
    } catch (error) {
      res.status(500).json({ error: "Error fetching sale details", detail: String(error) });
    }
  }

  // GET ONE DETAIL BY ID
  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const detail = await SaleDetail.findByPk(id, {
        include: [
          { model: Sale, as: "sale" },
          { model: Product, as: "product" }
        ]
      });
      if (!detail) {
        res.status(404).json({ error: "Sale detail not found" });
        return;
      }
      res.status(200).json({ detail });
    } catch (error) {
      res.status(500).json({ error: "Error fetching sale detail", detail: String(error) });
    }
  }

  // CREATE SALE DETAIL WITH TRANSACTION & STOCK DISCOUNT
  public async create(req: Request, res: Response) {
    const transaction = await sequelize.transaction();
    try {
      const body = req.body && typeof req.body === "object" ? req.body : {};
      const { sale_id, product_id, cantidad } = body;
      const saleId = Number(sale_id);
      const productId = Number(product_id);
      const quantity = Number(cantidad);

      if (
        !Number.isInteger(saleId) || saleId < 1 ||
        !Number.isInteger(productId) || productId < 1 ||
        !Number.isInteger(quantity) || quantity < 1
      ) {
        res.status(400).json({ error: "sale_id, product_id, and cantidad must be positive integers" });
        await transaction.rollback();
        return;
      }

      // Validar Venta
      const sale = await Sale.findByPk(saleId, { transaction, lock: transaction.LOCK.UPDATE });
      if (!sale) {
        res.status(404).json({ error: "Sale not found" });
        await transaction.rollback();
        return;
      }

      // Validar Producto y Stock
      const product = await Product.findByPk(productId, { transaction, lock: transaction.LOCK.UPDATE });
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        await transaction.rollback();
        return;
      }

      if (product.stock < quantity) {
        res.status(400).json({
          error: `Stock insuficiente. Disponible: ${product.stock}, solicitado: ${quantity}`
        });
        await transaction.rollback();
        return;
      }

      const precio_unitario = Number(product.precio);
      const subtotal = precio_unitario * quantity;

      // Crear Detalle
      const detail = await SaleDetail.create(
        {
          sale_id: saleId,
          product_id: productId,
          cantidad: quantity,
          precio_unitario,
          subtotal
        },
        { transaction }
      );

      // Descontar Stock del Producto
      await product.update({ stock: product.stock - quantity }, { transaction });

      // Actualizar Monto Total de la Venta Maestra
      const nuevoMontoTotal = Number(sale.monto_total) + subtotal;
      await sale.update({ monto_total: nuevoMontoTotal }, { transaction });

      await transaction.commit();

      res.status(201).json({ detail });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ error: "Error creating sale detail", detail: String(error) });
    }
  }

  public async update(req: Request, res: Response) {
      const transaction = await sequelize.transaction();
      try {
        const id = paramId(req);
        const cantidad = Number(req.body?.cantidad);
        if (!Number.isInteger(id) || id < 1 || !Number.isInteger(cantidad) || cantidad < 1) {
          res.status(400).json({ error: "A valid id and positive integer cantidad are required" });
          await transaction.rollback();
          return;
        }

        const detail = await SaleDetail.findByPk(id, { transaction, lock: transaction.LOCK.UPDATE });
        if (!detail) {
          res.status(404).json({ error: "Sale detail not found" });
          await transaction.rollback();
          return;
        }
        const [sale, product] = await Promise.all([
          Sale.findByPk(detail.sale_id, { transaction, lock: transaction.LOCK.UPDATE }),
          Product.findByPk(detail.product_id, { transaction, lock: transaction.LOCK.UPDATE }),
        ]);
        if (!sale || !product) {
          res.status(409).json({ error: "Sale detail has no associated sale or product" });
          await transaction.rollback();
          return;
        }

        const availableStock = product.stock + detail.cantidad;
        if (cantidad > availableStock) {
          res.status(400).json({
            error: `Stock insuficiente. Disponible: ${availableStock}, solicitado: ${cantidad}`,
          });
          await transaction.rollback();
          return;
        }

        const subtotal = Number(detail.precio_unitario) * cantidad;
        const totalDelta = subtotal - Number(detail.subtotal);
        await product.update({ stock: availableStock - cantidad }, { transaction });
        await sale.update({ monto_total: Number(sale.monto_total) + totalDelta }, { transaction });
        await detail.update({ cantidad, subtotal }, { transaction });
        await transaction.commit();
        res.status(200).json({ message: "Sale detail updated", detail });
      } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: "Error updating sale detail", detail: String(error) });
      }
    }

  public async remove(req: Request, res: Response) {
      const transaction = await sequelize.transaction();
      try {
        const id = paramId(req);
        if (!Number.isInteger(id) || id < 1) {
          res.status(400).json({ error: "Invalid sale detail id" });
          await transaction.rollback();
          return;
        }
        const detail = await SaleDetail.findByPk(id, { transaction, lock: transaction.LOCK.UPDATE });
        if (!detail) {
          res.status(404).json({ error: "Sale detail not found" });
          await transaction.rollback();
          return;
        }
        const [sale, product] = await Promise.all([
          Sale.findByPk(detail.sale_id, { transaction, lock: transaction.LOCK.UPDATE }),
          Product.findByPk(detail.product_id, { transaction, lock: transaction.LOCK.UPDATE }),
        ]);
        if (!sale || !product) {
          res.status(409).json({ error: "Sale detail has no associated sale or product" });
          await transaction.rollback();
          return;
        }

        await product.update({ stock: product.stock + detail.cantidad }, { transaction });
        await detail.destroy({ transaction });
        const remainingDetails = await SaleDetail.findAll({
          where: { sale_id: sale.id },
          attributes: ["subtotal"],
          transaction,
        });
        const total = remainingDetails.reduce((sum, item) => sum + Number(item.subtotal), 0);
        await sale.update({ monto_total: total }, { transaction });
        await transaction.commit();
        res.status(200).json({ message: "Sale detail deleted and stock restored" });
      } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: "Error deleting sale detail", detail: String(error) });
    }
  }
}
