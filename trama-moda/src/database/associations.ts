import { Branch } from "../features/business/branch/branch.model";
import { Category } from "../features/business/category/category.model";
import { Inventory } from "../features/business/inventory/inventory.model";
import { Product } from "../features/business/product/product.model";
import { Supplier } from "../features/business/supplier/supplier.model";
import { Variant } from "../features/business/variants/variant.model";

export const setupAssociations = (): void => {
  if (!Category.associations.products) {
    Category.hasMany(Product, {
      foreignKey: "category_id",
      as: "products",
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  }
  if (!Product.associations.category) {
    Product.belongsTo(Category, {
      foreignKey: "category_id",
      as: "category",
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  }

  if (!Supplier.associations.products) {
    Supplier.hasMany(Product, {
      foreignKey: "supplier_id",
      as: "products",
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  }
  if (!Product.associations.supplier) {
    Product.belongsTo(Supplier, {
      foreignKey: "supplier_id",
      as: "supplier",
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  }

  if (!Product.associations.variants) {
    Product.hasMany(Variant, {
      foreignKey: "product_id",
      as: "variants",
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  }
  if (!Variant.associations.product) {
    Variant.belongsTo(Product, {
      foreignKey: "product_id",
      as: "product",
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  }

  if (!Variant.associations.inventories) {
    Variant.hasMany(Inventory, {
      foreignKey: "variantId",
      as: "inventories",
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    });
  }
  if (!Inventory.associations.variant) {
    Inventory.belongsTo(Variant, {
      foreignKey: "variantId",
      as: "variant",
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    });
  }

  if (!Branch.associations.inventories) {
    Branch.hasMany(Inventory, {
      foreignKey: "branchId",
      as: "inventories",
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    });
  }
  if (!Inventory.associations.branch) {
    Inventory.belongsTo(Branch, {
      foreignKey: "branchId",
      as: "branch",
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    });
  }
};
