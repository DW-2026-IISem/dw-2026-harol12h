"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_model_1 = require("./product.model");
function paramId(req) {
    const raw = req.params.id;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return Number(value);
}
class ProductController {
    async getAll(req, res) {
        try {
            const products = await product_model_1.Product.findAll({ where: { status: "active" } });
            res.status(200).json({ products });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching products", detail: String(error) });
        }
    }
    async getOne(req, res) {
        try {
            const id = paramId(req);
            const product = await product_model_1.Product.findByPk(id);
            if (!product) {
                res.status(404).json({ error: "Product not found" });
                return;
            }
            res.status(200).json({ product });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching product", detail: String(error) });
        }
    }
    async create(req, res) {
        try {
            const { nombre, descripcion, precio, stock } = req.body;
            const product = await product_model_1.Product.create({
                nombre,
                descripcion,
                precio,
                stock: stock || 0,
                status: "active"
            });
            res.status(201).json({ product });
        }
        catch (error) {
            res.status(500).json({ error: "Error creating product", detail: String(error) });
        }
    }
    async update(req, res) {
        try {
            const id = paramId(req);
            const product = await product_model_1.Product.findByPk(id);
            if (!product) {
                res.status(404).json({ error: "Product not found" });
                return;
            }
            await product.update(req.body);
            res.status(200).json({ message: "Product updated successfully", product });
        }
        catch (error) {
            res.status(500).json({ error: "Error updating product", detail: String(error) });
        }
    }
    async deleteLogical(req, res) {
        try {
            const id = paramId(req);
            const product = await product_model_1.Product.findByPk(id);
            if (!product) {
                res.status(404).json({ error: "Product not found" });
                return;
            }
            await product.update({ status: "inactive" });
            res.status(200).json({ message: "Product deactivated", product });
        }
        catch (error) {
            res.status(500).json({ error: "Error deactivating product", detail: String(error) });
        }
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map