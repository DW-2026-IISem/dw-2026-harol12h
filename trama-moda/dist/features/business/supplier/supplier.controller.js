"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierController = void 0;
const supplier_model_1 = require("./supplier.model");
function paramId(req) {
    const raw = req.params.id;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return Number(value);
}
class SupplierController {
    async getAll(req, res) {
        try {
            const suppliers = await supplier_model_1.Supplier.findAll({ where: { is_active: true } });
            res.status(200).json({ suppliers });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching suppliers", detail: String(error) });
        }
    }
    async getOne(req, res) {
        try {
            const id = paramId(req);
            const supplier = await supplier_model_1.Supplier.findByPk(id);
            if (!supplier) {
                res.status(404).json({ error: "Supplier record not found" });
                return;
            }
            res.status(200).json({ supplier });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching supplier record", detail: String(error) });
        }
    }
    async create(req, res) {
        try {
            const { name, contact_name, email, phone, address } = req.body;
            const supplier = await supplier_model_1.Supplier.create({
                name,
                contact_name,
                email,
                phone,
                address,
                is_active: true
            });
            res.status(201).json({ supplier });
        }
        catch (error) {
            res.status(500).json({ error: "Error creating supplier record", detail: String(error) });
        }
    }
    async update(req, res) {
        try {
            const id = paramId(req);
            const supplier = await supplier_model_1.Supplier.findByPk(id);
            if (!supplier) {
                res.status(404).json({ error: "Supplier record not found" });
                return;
            }
            await supplier.update(req.body);
            res.status(200).json({ message: "Supplier updated successfully", supplier });
        }
        catch (error) {
            res.status(500).json({ error: "Error updating supplier", detail: String(error) });
        }
    }
    async deleteLogical(req, res) {
        try {
            const id = paramId(req);
            const supplier = await supplier_model_1.Supplier.findByPk(id);
            if (!supplier) {
                res.status(404).json({ error: "Supplier record not found" });
                return;
            }
            await supplier.update({ is_active: false });
            res.status(200).json({ message: "Supplier record deactivated", supplier });
        }
        catch (error) {
            res.status(500).json({ error: "Error deactivating supplier record", detail: String(error) });
        }
    }
}
exports.SupplierController = SupplierController;
//# sourceMappingURL=supplier.controller.js.map