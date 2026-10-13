"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const client_model_1 = require("./client.model");
function paramId(req) {
    const raw = req.params.id;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return Number(value);
}
class ClientController {
    async getAll(req, res) {
        try {
            const clients = await client_model_1.Client.findAll({ where: { status: "active" } });
            res.status(200).json({ clients });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching clients", detail: String(error) });
        }
    }
    async getOne(req, res) {
        try {
            const id = paramId(req);
            const client = await client_model_1.Client.findByPk(id);
            if (!client) {
                res.status(404).json({ error: "Client not found" });
                return;
            }
            res.status(200).json({ client });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching client", detail: String(error) });
        }
    }
    async create(req, res) {
        try {
            const { tipo_documento, nombre, numero_documento, email, telefono } = req.body;
            const client = await client_model_1.Client.create({
                tipo_documento,
                nombre,
                numero_documento,
                email,
                telefono,
                status: "active"
            });
            res.status(201).json({ client });
        }
        catch (error) {
            res.status(500).json({ error: "Error creating client", detail: String(error) });
        }
    }
    async update(req, res) {
        try {
            const id = paramId(req);
            const client = await client_model_1.Client.findByPk(id);
            if (!client) {
                res.status(404).json({ error: "Client not found" });
                return;
            }
            await client.update(req.body);
            res.status(200).json({ message: "Client updated successfully", client });
        }
        catch (error) {
            res.status(500).json({ error: "Error updating client", detail: String(error) });
        }
    }
    async deleteLogical(req, res) {
        try {
            const id = paramId(req);
            const client = await client_model_1.Client.findByPk(id);
            if (!client) {
                res.status(404).json({ error: "Client not found" });
                return;
            }
            await client.update({ status: "inactive" });
            res.status(200).json({ message: "Client deactivated", client });
        }
        catch (error) {
            res.status(500).json({ error: "Error deactivating client", detail: String(error) });
        }
    }
}
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map