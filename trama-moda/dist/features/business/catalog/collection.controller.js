"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionController = void 0;
const collection_model_1 = require("./collection.model");
function paramId(req) {
    const raw = req.params.id;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return Number(value);
}
class CollectionController {
    async getAll(req, res) {
        try {
            const collections = await collection_model_1.Collection.findAll({ where: { is_active: true } });
            res.status(200).json({ collections });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching collections", detail: String(error) });
        }
    }
    async getOne(req, res) {
        try {
            const id = paramId(req);
            const collection = await collection_model_1.Collection.findByPk(id);
            if (!collection) {
                res.status(404).json({ error: "Collection not found" });
                return;
            }
            res.status(200).json({ collection });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching collection", detail: String(error) });
        }
    }
    async create(req, res) {
        try {
            const { nombre, descripcion } = req.body;
            const collection = await collection_model_1.Collection.create({
                nombre,
                descripcion,
                is_active: true
            });
            res.status(201).json({ collection });
        }
        catch (error) {
            res.status(500).json({ error: "Error creating collection", detail: String(error) });
        }
    }
    async update(req, res) {
        try {
            const id = paramId(req);
            const collection = await collection_model_1.Collection.findByPk(id);
            if (!collection) {
                res.status(404).json({ error: "Collection not found" });
                return;
            }
            await collection.update(req.body);
            res.status(200).json({ message: "Collection updated successfully", collection });
        }
        catch (error) {
            res.status(500).json({ error: "Error updating collection", detail: String(error) });
        }
    }
    async deleteLogical(req, res) {
        try {
            const id = paramId(req);
            const collection = await collection_model_1.Collection.findByPk(id);
            if (!collection) {
                res.status(404).json({ error: "Collection not found" });
                return;
            }
            await collection.update({ is_active: false });
            res.status(200).json({ message: "Collection deactivated", collection });
        }
        catch (error) {
            res.status(500).json({ error: "Error deactivating collection", detail: String(error) });
        }
    }
}
exports.CollectionController = CollectionController;
//# sourceMappingURL=collection.controller.js.map