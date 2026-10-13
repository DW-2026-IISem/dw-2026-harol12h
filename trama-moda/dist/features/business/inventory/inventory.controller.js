"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const inventory_model_1 = require("./inventory.model");
function paramId(req) {
    const raw = req.params.id;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return Number(value);
}
class InventoryController {
    async getAll(req, res) {
        try {
            const inventories = await inventory_model_1.Inventory.findAll({ where: { is_active: true } });
            res.status(200).json({ inventories });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching inventories", detail: String(error) });
        }
    }
    async getOne(req, res) {
        try {
            const id = paramId(req);
            const inventory = await inventory_model_1.Inventory.findByPk(id);
            if (!inventory) {
                res.status(404).json({ error: "Inventory record not found" });
                return;
            }
            res.status(200).json({ inventory });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching inventory record", detail: String(error) });
        }
    }
    async create(req, res) {
        try {
            const { branchId, variantId, stock } = req.body;
            const inventory = await inventory_model_1.Inventory.create({
                branchId,
                variantId,
                stock,
                is_active: true
            });
            res.status(201).json({ inventory });
        }
        catch (error) {
            res.status(500).json({ error: "Error creating inventory record", detail: String(error) });
        }
    }
    async update(req, res) {
        try {
            const id = paramId(req);
            const inventory = await inventory_model_1.Inventory.findByPk(id);
            if (!inventory) {
                res.status(404).json({ error: "Inventory record not found" });
                return;
            }
            await inventory.update(req.body);
            res.status(200).json({ message: "Inventory updated successfully", inventory });
        }
        catch (error) {
            res.status(500).json({ error: "Error updating inventory", detail: String(error) });
        }
    }
    async deleteLogical(req, res) {
        try {
            const id = paramId(req);
            const inventory = await inventory_model_1.Inventory.findByPk(id);
            if (!inventory) {
                res.status(404).json({ error: "Inventory record not found" });
                return;
            }
            await inventory.update({ is_active: false });
            res.status(200).json({ message: "Inventory record deactivated", inventory });
        }
        catch (error) {
            res.status(500).json({ error: "Error deactivating inventory record", detail: String(error) });
        }
    }
}
exports.InventoryController = InventoryController;
//# sourceMappingURL=inventory.controller.js.map