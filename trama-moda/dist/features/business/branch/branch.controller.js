"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchController = void 0;
const branch_model_1 = require("./branch.model");
function paramId(req) {
    const raw = req.params.id;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return Number(value);
}
class BranchController {
    async getAll(req, res) {
        try {
            const branches = await branch_model_1.Branch.findAll({ where: { is_active: true } });
            res.status(200).json({ branches });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching branches", detail: String(error) });
        }
    }
    async getOne(req, res) {
        try {
            const id = paramId(req);
            const branch = await branch_model_1.Branch.findByPk(id);
            if (!branch) {
                res.status(404).json({ error: "Branch not found" });
                return;
            }
            res.status(200).json({ branch });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching branch", detail: String(error) });
        }
    }
    async create(req, res) {
        try {
            const { nombre, direccion, telefono } = req.body;
            const branch = await branch_model_1.Branch.create({
                nombre,
                direccion,
                telefono,
                is_active: true
            });
            res.status(201).json({ branch });
        }
        catch (error) {
            res.status(500).json({ error: "Error creating branch", detail: String(error) });
        }
    }
    async update(req, res) {
        try {
            const id = paramId(req);
            const branch = await branch_model_1.Branch.findByPk(id);
            if (!branch) {
                res.status(404).json({ error: "Branch not found" });
                return;
            }
            await branch.update(req.body);
            res.status(200).json({ message: "Branch updated successfully", branch });
        }
        catch (error) {
            res.status(500).json({ error: "Error updating branch", detail: String(error) });
        }
    }
    async deleteLogical(req, res) {
        try {
            const id = paramId(req);
            const branch = await branch_model_1.Branch.findByPk(id);
            if (!branch) {
                res.status(404).json({ error: "Branch not found" });
                return;
            }
            await branch.update({ is_active: false });
            res.status(200).json({ message: "Branch deactivated", branch });
        }
        catch (error) {
            res.status(500).json({ error: "Error deactivating branch", detail: String(error) });
        }
    }
}
exports.BranchController = BranchController;
//# sourceMappingURL=branch.controller.js.map