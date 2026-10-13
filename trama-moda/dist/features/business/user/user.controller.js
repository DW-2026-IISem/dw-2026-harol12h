"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_model_1 = require("./user.model");
function paramId(req) {
    const raw = req.params.id;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return Number(value);
}
class UserController {
    async getAll(req, res) {
        try {
            const users = await user_model_1.User.findAll({
                where: { status: "active" },
            });
            res.status(200).json({ users });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching users", detail: String(error) });
        }
    }
    async getOne(req, res) {
        try {
            const id = paramId(req);
            const user = await user_model_1.User.findByPk(id);
            if (!user) {
                res.status(404).json({ error: "User record not found" });
                return;
            }
            res.status(200).json({ user });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching user record", detail: String(error) });
        }
    }
    async create(req, res) {
        try {
            const body = req.body && typeof req.body === "object" ? req.body : {};
            const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";
            const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
            if (!nombre || nombre.length > 100) {
                res.status(400).json({ error: "nombre is required and must contain at most 100 characters" });
                return;
            }
            if (email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                res.status(400).json({ error: "email must be a valid address of at most 150 characters" });
                return;
            }
            if (await user_model_1.User.findOne({ where: { email } })) {
                res.status(409).json({ error: "Email is already in use" });
                return;
            }
            const user = await user_model_1.User.create({
                nombre,
                email,
                status: "active"
            });
            res.status(201).json({ user });
        }
        catch (error) {
            res.status(500).json({ error: "Error creating user record", detail: String(error) });
        }
    }
    async update(req, res) {
        try {
            const id = paramId(req);
            const user = await user_model_1.User.findByPk(id);
            if (!user) {
                res.status(404).json({ error: "User record not found" });
                return;
            }
            const body = req.body && typeof req.body === "object" ? req.body : {};
            const updates = {};
            if (body.nombre !== undefined) {
                const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";
                if (!nombre || nombre.length > 100) {
                    res.status(400).json({ error: "nombre must contain between 1 and 100 characters" });
                    return;
                }
                updates.nombre = nombre;
            }
            if (body.email !== undefined) {
                const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
                if (email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    res.status(400).json({ error: "email must be a valid address of at most 150 characters" });
                    return;
                }
                const duplicate = await user_model_1.User.findOne({ where: { email } });
                if (duplicate && duplicate.id !== user.id) {
                    res.status(409).json({ error: "Email is already in use" });
                    return;
                }
                updates.email = email;
            }
            if (Object.keys(updates).length === 0) {
                res.status(400).json({ error: "Provide nombre or email to update" });
                return;
            }
            await user.update(updates);
            res.status(200).json({ message: "User updated successfully", user });
        }
        catch (error) {
            res.status(500).json({ error: "Error updating user", detail: String(error) });
        }
    }
    async deleteLogical(req, res) {
        try {
            const id = paramId(req);
            const user = await user_model_1.User.findByPk(id);
            if (!user) {
                res.status(404).json({ error: "User record not found" });
                return;
            }
            await user.update({ status: "inactive" });
            res.status(200).json({ message: "User record deactivated", user });
        }
        catch (error) {
            res.status(500).json({ error: "Error deactivating user record", detail: String(error) });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map