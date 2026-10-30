import { Request, Response } from "express";
import { Category } from "../category/category.model";
import { Product } from "./product.model";
import { Supplier } from "../supplier/supplier.model";

type ProductRequestBody = Record<string, unknown>;

type RelationValidation =
  | { valid: true; value: number | null }
  | { valid: false; message: string };

function isRequestBody(value: unknown): value is ProductRequestBody {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseNumber(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function hasOwn(body: ProductRequestBody, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(body, key);
}

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class ProductController {
  private async validateActiveRelation(
    field: "category_id" | "supplier_id",
    value: unknown,
  ): Promise<RelationValidation> {
    if (value === null) {
      return { valid: true, value: null };
    }

    const id = parseNumber(value);
    if (id === null || !Number.isInteger(id) || id < 1) {
      return {
        valid: false,
        message: `${field} debe ser un identificador entero positivo o null.`,
      };
    }

    const relation =
      field === "category_id"
        ? await Category.findOne({ where: { id, is_active: true } })
        : await Supplier.findOne({ where: { id, is_active: true } });
    if (!relation) {
      return {
        valid: false,
        message: `La ${field === "category_id" ? "categoría" : "proveedor"} indicada no existe o está inactiva.`,
      };
    }

    return { valid: true, value: id };
  }

  public async getAll(req: Request, res: Response) {
    try {
      const products = await Product.findAll({ where: { status: "active" } });
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error: "Error fetching products", detail: String(error) });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Error fetching product", detail: String(error) });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      if (!isRequestBody(req.body)) {
        res.status(400).json({ error: "El cuerpo de la solicitud debe ser un objeto." });
        return;
      }

      const body = req.body;
      if (typeof body.nombre !== "string" || body.nombre.trim() === "") {
        res.status(400).json({ error: "El nombre del producto es obligatorio." });
        return;
      }

      const precio = parseNumber(body.precio);
      if (precio === null || precio <= 0) {
        res.status(400).json({ error: "El precio debe ser un número válido mayor que cero." });
        return;
      }

      const stock = hasOwn(body, "stock") ? parseNumber(body.stock) : 0;
      if (stock === null || !Number.isInteger(stock) || stock < 0) {
        res.status(400).json({ error: "El stock debe ser un número entero mayor o igual a cero." });
        return;
      }

      const descripcion = body.descripcion ?? null;
      if (descripcion !== null && typeof descripcion !== "string") {
        res.status(400).json({ error: "La descripción debe ser texto o null." });
        return;
      }

      const category = await this.validateActiveRelation(
        "category_id",
        body.category_id ?? null,
      );
      if (!category.valid) {
        res.status(400).json({ error: category.message });
        return;
      }

      const supplier = await this.validateActiveRelation(
        "supplier_id",
        body.supplier_id ?? null,
      );
      if (!supplier.valid) {
        res.status(400).json({ error: supplier.message });
        return;
      }

      const product = await Product.create({
        nombre: body.nombre.trim(),
        descripcion,
        precio,
        stock,
        category_id: category.value,
        supplier_id: supplier.value,
        status: "active"
      });
      res.status(201).json({ product });
    } catch (error) {
      res.status(500).json({ error: "Error creating product", detail: String(error) });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      if (!isRequestBody(req.body)) {
        res.status(400).json({ error: "El cuerpo de la solicitud debe ser un objeto." });
        return;
      }

      const body = req.body;
      const updates: ProductRequestBody = {};

      if (hasOwn(body, "nombre")) {
        if (typeof body.nombre !== "string" || body.nombre.trim() === "") {
          res.status(400).json({ error: "El nombre del producto no puede estar vacío." });
          return;
        }
        updates.nombre = body.nombre.trim();
      }

      if (hasOwn(body, "precio")) {
        const precio = parseNumber(body.precio);
        if (precio === null || precio <= 0) {
          res.status(400).json({ error: "El precio debe ser un número válido mayor que cero." });
          return;
        }
        updates.precio = precio;
      }

      if (hasOwn(body, "stock")) {
        const stock = parseNumber(body.stock);
        if (stock === null || !Number.isInteger(stock) || stock < 0) {
          res.status(400).json({ error: "El stock debe ser un número entero mayor o igual a cero." });
          return;
        }
        updates.stock = stock;
      }

      if (hasOwn(body, "descripcion")) {
        if (body.descripcion !== null && typeof body.descripcion !== "string") {
          res.status(400).json({ error: "La descripción debe ser texto o null." });
          return;
        }
        updates.descripcion = body.descripcion;
      }

      if (hasOwn(body, "category_id")) {
        const category = await this.validateActiveRelation(
          "category_id",
          body.category_id,
        );
        if (!category.valid) {
          res.status(400).json({ error: category.message });
          return;
        }
        updates.category_id = category.value;
      }

      if (hasOwn(body, "supplier_id")) {
        const supplier = await this.validateActiveRelation(
          "supplier_id",
          body.supplier_id,
        );
        if (!supplier.valid) {
          res.status(400).json({ error: supplier.message });
          return;
        }
        updates.supplier_id = supplier.value;
      }

      await product.update(updates);
      res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
      res.status(500).json({ error: "Error updating product", detail: String(error) });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      await product.update({ status: "inactive" });
      res.status(200).json({ message: "Product deactivated", product });
    } catch (error) {
      res.status(500).json({ error: "Error deactivating product", detail: String(error) });
    }
  }
}
