import { Branch } from "../features/business/branch/branch.model";
import { Category } from "../features/business/category/category.model";
import { Collection } from "../features/business/catalog/collection.model";
import { Client } from "../features/business/client/client.model";
import { Inventory } from "../features/business/inventory/inventory.model";
import { Product } from "../features/business/product/product.model";
import { Sale } from "../features/business/sale/sale.model";
import { SaleDetail } from "../features/business/sale/sale-detail.model";
import { Supplier } from "../features/business/supplier/supplier.model";
import { User } from "../features/business/user/user.model";
import { Variant } from "../features/business/variants/variant.model";

export const setupAssociations = () => {
  // --- User & Branch ---
  User.belongsTo(Branch, { foreignKey: "branchId", as: "branch" });
  Branch.hasMany(User, { foreignKey: "branchId", as: "users" });

  // --- Inventory, Branch & Variant ---
  Inventory.belongsTo(Branch, { foreignKey: "branchId", as: "branch" });
  Branch.hasMany(Inventory, { foreignKey: "branchId", as: "inventories" });

  Inventory.belongsTo(Variant, { foreignKey: "variantId", as: "variant" });
  Variant.hasMany(Inventory, { foreignKey: "variantId", as: "inventories" });

  // --- Variant & Product ---
  Variant.belongsTo(Product, { foreignKey: "productId", as: "product" });
  Product.hasMany(Variant, { foreignKey: "variants", as: "productVariants" });

  // --- Sale, Client & Branch ---
  Sale.belongsTo(Client, { foreignKey: "clientId", as: "client" });
  Client.hasMany(Sale, { foreignKey: "clientId", as: "sales" });

  Sale.belongsTo(Branch, { foreignKey: "branchId", as: "branch" });
  Branch.hasMany(Sale, { foreignKey: "branchId", as: "sales" });

  // --- SaleDetail, Sale & Variant ---
  SaleDetail.belongsTo(Sale, { foreignKey: "saleId", as: "sale" });
  Sale.hasMany(SaleDetail, { foreignKey: "saleId", as: "details" });

  SaleDetail.belongsTo(Variant, { foreignKey: "variantId", as: "variant" });
  Variant.hasMany(SaleDetail, { foreignKey: "variantId", as: "saleDetails" });

  console.log("🔗 Asociaciones de Sequelize inicializadas correctamente.");
};
