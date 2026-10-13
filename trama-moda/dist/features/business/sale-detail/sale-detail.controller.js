"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleDetailController = void 0;
const db_1 = require("../../../database/db");
const sale_detail_model_1 = require("./sale-detail.model");
const sale_model_1 = require("../sale/sale.model");
const product_model_1 = require("../product/product.model");
function paramId(req) {
    const raw = req.params.id;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return Number(value);
}
class SaleDetailController {
    // GET ALL DETAILS
    async getAll(req, res) {
        try {
            const details = await sale_detail_model_1.SaleDetail.findAll({
                include: [
                    { model: sale_model_1.Sale, as: "sale" },
                    { model: product_model_1.Product, as: "product", attributes: ["id", "nombre", "precio"] }
                ]
            });
            res.status(200).json({ details });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching sale details", detail: String(error) });
        }
    }
    // GET ONE DETAIL BY ID
    async getOne(req, res) {
        try {
            const id = paramId(req);
            const detail = await sale_detail_model_1.SaleDetail.findByPk(id, {
                include: [
                    { model: sale_model_1.Sale, as: "sale" },
                    { model: product_model_1.Product, as: "product" }
                ]
            });
            if (!detail) {
                res.status(404).json({ error: "Sale detail not found" });
                return;
            }
            res.status(200).json({ detail });
        }
        catch (error) {
            res.status(500).json({ error: "Error fetching sale detail", detail: String(error) });
        }
    }
    // CREATE SALE DETAIL WITH TRANSACTION & STOCK DISCOUNT
    async create(req, res) {
        const transaction = await db_1.sequelize.transaction();
        try {
            const body = req.body && typeof req.body === "object" ? req.body : {};
            const { sale_id, product_id, cantidad } = body;
            const saleId = Number(sale_id);
            const productId = Number(product_id);
            const quantity = Number(cantidad);
            if (!Number.isInteger(saleId) || saleId < 1 ||
                !Number.isInteger(productId) || productId < 1 ||
                !Number.isInteger(quantity) || quantity < 1) {
                res.status(400).json({ error: "sale_id, product_id, and cantidad must be positive integers" });
                await transaction.rollback();
                return;
            }
            // Validar Venta
            const sale = await sale_model_1.Sale.findByPk(saleId, { transaction, lock: transaction.LOCK.UPDATE });
            if (!sale) {
                res.status(404).json({ error: "Sale not found" });
                await transaction.rollback();
                return;
            }
            // Validar Producto y Stock
            const product = await product_model_1.Product.findByPk(productId, { transaction, lock: transaction.LOCK.UPDATE });
            if (!product) {
                res.status(404).json({ error: "Product not found" });
                await transaction.rollback();
                return;
            }
            if (product.stock < quantity) {
                res.status(400).json({
                    error: `Stock insuficiente. Disponible: ${product.stock}, solicitado: ${quantity}`
                });
                await transaction.rollback();
                return;
            }
            const precio_unitario = Number(product.precio);
            const subtotal = precio_unitario * quantity;
            // Crear Detalle
            const detail = await sale_detail_model_1.SaleDetail.create({
                sale_id: saleId,
                product_id: productId,
                cantidad: quantity,
                precio_unitario,
                subtotal
            }, { transaction });
            // Descontar Stock del Producto
            await product.update({ stock: product.stock - quantity }, { transaction });
            // Actualizar Monto Total de la Venta Maestra
            const nuevoMontoTotal = Number(sale.monto_total) + subtotal;
            await sale.update({ monto_total: nuevoMontoTotal }, { transaction });
            await transaction.commit();
            res.status(201).json({ detail });
        }
        catch (error) {
            await transaction.rollback();
            res.status(500).json({ error: "Error creating sale detail", detail: String(error) });
        }
    }
    async update(req, res) {
        const transaction = await db_1.sequelize.transaction();
        try {
            const id = paramId(req);
            const cantidad = Number(req.body?.cantidad);
            if (!Number.isInteger(id) || id < 1 || !Number.isInteger(cantidad) || cantidad < 1) {
                res.status(400).json({ error: "A valid id and positive integer cantidad are required" });
                await transaction.rollback();
                return;
            }
            const detail = await sale_detail_model_1.SaleDetail.findByPk(id, { transaction, lock: transaction.LOCK.UPDATE });
            if (!detail) {
                res.status(404).json({ error: "Sale detail not found" });
                await transaction.rollback();
                return;
            }
            const [sale, product] = await Promise.all([
                sale_model_1.Sale.findByPk(detail.sale_id, { transaction, lock: transaction.LOCK.UPDATE }),
                product_model_1.Product.findByPk(detail.product_id, { transaction, lock: transaction.LOCK.UPDATE }),
            ]);
            if (!sale || !product) {
                res.status(409).json({ error: "Sale detail has no associated sale or product" });
                await transaction.rollback();
                return;
            }
            const availableStock = product.stock + detail.cantidad;
            if (cantidad > availableStock) {
                res.status(400).json({
                    error: `Stock insuficiente. Disponible: ${availableStock}, solicitado: ${cantidad}`,
                });
                await transaction.rollback();
                return;
            }
            const subtotal = Number(detail.precio_unitario) * cantidad;
            const totalDelta = subtotal - Number(detail.subtotal);
            await product.update({ stock: availableStock - cantidad }, { transaction });
            await sale.update({ monto_total: Number(sale.monto_total) + totalDelta }, { transaction });
            await detail.update({ cantidad, subtotal }, { transaction });
            await transaction.commit();
            res.status(200).json({ message: "Sale detail updated", detail });
        }
        catch (error) {
            await transaction.rollback();
            res.status(500).json({ error: "Error updating sale detail", detail: String(error) });
        }
    }
    async remove(req, res) {
        const transaction = await db_1.sequelize.transaction();
        try {
            const id = paramId(req);
            if (!Number.isInteger(id) || id < 1) {
                res.status(400).json({ error: "Invalid sale detail id" });
                await transaction.rollback();
                return;
            }
            const detail = await sale_detail_model_1.SaleDetail.findByPk(id, { transaction, lock: transaction.LOCK.UPDATE });
            if (!detail) {
                res.status(404).json({ error: "Sale detail not found" });
                await transaction.rollback();
                return;
            }
            const [sale, product] = await Promise.all([
                sale_model_1.Sale.findByPk(detail.sale_id, { transaction, lock: transaction.LOCK.UPDATE }),
                product_model_1.Product.findByPk(detail.product_id, { transaction, lock: transaction.LOCK.UPDATE }),
            ]);
            if (!sale || !product) {
                res.status(409).json({ error: "Sale detail has no associated sale or product" });
                await transaction.rollback();
                return;
            }
            await product.update({ stock: product.stock + detail.cantidad }, { transaction });
            await detail.destroy({ transaction });
            const remainingDetails = await sale_detail_model_1.SaleDetail.findAll({
                where: { sale_id: sale.id },
                attributes: ["subtotal"],
                transaction,
            });
            const total = remainingDetails.reduce((sum, item) => sum + Number(item.subtotal), 0);
            await sale.update({ monto_total: total }, { transaction });
            await transaction.commit();
            res.status(200).json({ message: "Sale detail deleted and stock restored" });
        }
        catch (error) {
            await transaction.rollback();
            res.status(500).json({ error: "Error deleting sale detail", detail: String(error) });
        }
    }
}
exports.SaleDetailController = SaleDetailController;
//# sourceMappingURL=sale-detail.controller.js.map