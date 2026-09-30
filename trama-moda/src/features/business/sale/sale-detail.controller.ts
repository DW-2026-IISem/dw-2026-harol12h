import { Request, Response } from "express";
import { sequelize } from "../../../database/db";
import { SaleDetail } from "./sale-detail.model";
import { Sale } from "./sale.model";
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
      const { sale_id, product_id, cantidad } = req.body;

      if (!sale_id || !product_id || !cantidad) {
        res.status(400).json({ error: "sale_id, product_id, and cantidad are required" });
        await transaction.rollback();
        return;
      }

      // Validar Venta
      const sale = await Sale.findByPk(sale_id, { transaction });
      if (!sale) {
        res.status(404).json({ error: "Sale not found" });
        await transaction.rollback();
        return;
      }

      // Validar Producto y Stock
      const product = await Product.findByPk(product_id, { transaction });
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        await transaction.rollback();
        return;
      }

      if (product.stock < cantidad) {
        res.status(400).json({
          error: `Stock insuficiente. Disponible: ${product.stock}, solicitado: ${cantidad}`
        });
        await transaction.rollback();
        return;
      }

      const precio_unitario = Number(product.precio);
      const subtotal = precio_unitario * cantidad;

      // Crear Detalle
      const detail = await SaleDetail.create(
        {
          sale_id,
          product_id,
          cantidad,
          precio_unitario,
          subtotal
        },
        { transaction }
      );

      // Descontar Stock del Producto
      await product.update({ stock: product.stock - cantidad }, { transaction });

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
}
