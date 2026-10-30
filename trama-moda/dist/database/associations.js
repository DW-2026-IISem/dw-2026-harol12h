"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAssociations = void 0;
const branch_model_1 = require("../features/business/branch/branch.model");
const category_model_1 = require("../features/business/category/category.model");
const inventory_model_1 = require("../features/business/inventory/inventory.model");
const product_model_1 = require("../features/business/product/product.model");
const supplier_model_1 = require("../features/business/supplier/supplier.model");
const variant_model_1 = require("../features/business/variants/variant.model");
const setupAssociations = () => {
    if (!category_model_1.Category.associations.products) {
        category_model_1.Category.hasMany(product_model_1.Product, {
            foreignKey: "category_id",
            as: "products",
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        });
    }
    if (!product_model_1.Product.associations.category) {
        product_model_1.Product.belongsTo(category_model_1.Category, {
            foreignKey: "category_id",
            as: "category",
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        });
    }
    if (!supplier_model_1.Supplier.associations.products) {
        supplier_model_1.Supplier.hasMany(product_model_1.Product, {
            foreignKey: "supplier_id",
            as: "products",
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        });
    }
    if (!product_model_1.Product.associations.supplier) {
        product_model_1.Product.belongsTo(supplier_model_1.Supplier, {
            foreignKey: "supplier_id",
            as: "supplier",
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        });
    }
    if (!product_model_1.Product.associations.variants) {
        product_model_1.Product.hasMany(variant_model_1.Variant, {
            foreignKey: "product_id",
            as: "variants",
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        });
    }
    if (!variant_model_1.Variant.associations.product) {
        variant_model_1.Variant.belongsTo(product_model_1.Product, {
            foreignKey: "product_id",
            as: "product",
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
        });
    }
    if (!variant_model_1.Variant.associations.inventories) {
        variant_model_1.Variant.hasMany(inventory_model_1.Inventory, {
            foreignKey: "variantId",
            as: "inventories",
            onUpdate: "CASCADE",
            onDelete: "RESTRICT"
        });
    }
    if (!inventory_model_1.Inventory.associations.variant) {
        inventory_model_1.Inventory.belongsTo(variant_model_1.Variant, {
            foreignKey: "variantId",
            as: "variant",
            onUpdate: "CASCADE",
            onDelete: "RESTRICT"
        });
    }
    if (!branch_model_1.Branch.associations.inventories) {
        branch_model_1.Branch.hasMany(inventory_model_1.Inventory, {
            foreignKey: "branchId",
            as: "inventories",
            onUpdate: "CASCADE",
            onDelete: "RESTRICT"
        });
    }
    if (!inventory_model_1.Inventory.associations.branch) {
        inventory_model_1.Inventory.belongsTo(branch_model_1.Branch, {
            foreignKey: "branchId",
            as: "branch",
            onUpdate: "CASCADE",
            onDelete: "RESTRICT"
        });
    }
};
exports.setupAssociations = setupAssociations;
//# sourceMappingURL=associations.js.map