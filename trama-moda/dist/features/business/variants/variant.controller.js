"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantController = void 0;
const variant_model_1 = require("./variant.model");
function paramId(req) {
    const raw = req.params.id;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return Number(value);
}
class VariantController {
    async getAll(req, res) {
        try {
            const variants = await variant_model_1.Variant.findAll({ where: { is_active: true } });
            res.status(200).json({ variants });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching variants", detail: String(error) });
        }
    }
    async getOne(req, res) {
        try {
            const id = paramId(req);
            const variant = await variant_model_1.Variant.findByPk(id);
            if (!variant) {
                res.status(404).json({ error: "Variant not found" });
                return;
            }
            res.status(200).json({ variant });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching variant", detail: String(error) });
        }
    }
    async create(req, res) {
        try {
            const { nombre, descripcion, product_id } = req.body;
            const variant = await variant_model_1.Variant.create({
                nombre,
                descripcion,
                product_id: product_id ?? null,
                is_active: true
            });
            res.status(201).json({ variant });
        }
        catch (error) {
            res.status(500).json({ error: "Error creating variant", detail: String(error) });
        }
    }
    async update(req, res) {
        try {
            const id = paramId(req);
            const variant = await variant_model_1.Variant.findByPk(id);
            if (!variant) {
                res.status(404).json({ error: "Variant not found" });
                return;
            }
            await variant.update(req.body);
            res.status(200).json({ message: "Variant updated successfully", variant });
        }
        catch (error) {
            res.status(500).json({ error: "Error updating variant", detail: String(error) });
        }
    }
    async deleteLogical(req, res) {
        try {
            const id = paramId(req);
            const variant = await variant_model_1.Variant.findByPk(id);
            if (!variant) {
                res.status(404).json({ error: "Variant not found" });
                return;
            }
            await variant.update({ is_active: false });
            res.status(200).json({ message: "Variant deactivated", variant });
        }
        catch (error) {
            res.status(500).json({ error: "Error deactivating variant", detail: String(error) });
        }
    }
}
exports.VariantController = VariantController;
//# sourceMappingURL=variant.controller.js.map