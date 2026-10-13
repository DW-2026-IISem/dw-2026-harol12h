"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_model_1 = require("./category.model");
function paramId(req) {
    const raw = req.params.id;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return Number(value);
}
class CategoryController {
    async getAll(req, res) {
        try {
            const categories = await category_model_1.Category.findAll({ where: { is_active: true } });
            res.status(200).json({ categories });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching categories", detail: String(error) });
        }
    }
    async getOne(req, res) {
        try {
            const id = paramId(req);
            const category = await category_model_1.Category.findByPk(id);
            if (!category) {
                res.status(404).json({ error: "Category record not found" });
                return;
            }
            res.status(200).json({ category });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching category record", detail: String(error) });
        }
    }
    async create(req, res) {
        try {
            const { name, description } = req.body;
            const category = await category_model_1.Category.create({
                name,
                description,
                is_active: true
            });
            res.status(201).json({ category });
        }
        catch (error) {
            res.status(500).json({ error: "Error creating category record", detail: String(error) });
        }
    }
    async update(req, res) {
        try {
            const id = paramId(req);
            const category = await category_model_1.Category.findByPk(id);
            if (!category) {
                res.status(404).json({ error: "Category record not found" });
                return;
            }
            await category.update(req.body);
            res.status(200).json({ message: "Category updated successfully", category });
        }
        catch (error) {
            res.status(500).json({ error: "Error updating category", detail: String(error) });
        }
    }
    async deleteLogical(req, res) {
        try {
            const id = paramId(req);
            const category = await category_model_1.Category.findByPk(id);
            if (!category) {
                res.status(404).json({ error: "Category record not found" });
                return;
            }
            await category.update({ is_active: false });
            res.status(200).json({ message: "Category record deactivated", category });
        }
        catch (error) {
            res.status(500).json({ error: "Error deactivating category record", detail: String(error) });
        }
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map