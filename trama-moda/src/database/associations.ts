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
  User.belongsTo(Branch, { foreignKey: "branchId", as: "userBranch" });
  Branch.hasMany(User, { foreignKey: "branchId", as: "branchUsers" });

  // --- Inventory, Branch & Variant ---
  Inventory.belongsTo(Branch, { foreignKey: "branchId", as: "inventoryBranch" });
  Branch.hasMany(Inventory, { foreignKey: "branchId", as: "branchInventories" });

  Inventory.belongsTo(Variant, { foreignKey: "variantId", as: "inventoryVariant" });
  Variant.hasMany(Inventory, { foreignKey: "variantId", as: "variantInventories" });

  // --- Variant & Product ---
  Variant.belongsTo(Product, { foreignKey: "productId", as: "variantProduct" });
  Product.hasMany(Variant, { foreignKey: "productId", as: "productVariants" });

  // --- Sale, Client & Branch ---
  Sale.belongsTo(Client, { foreignKey: "clientId", as: "saleClient" });
  Client.hasMany(Sale, { foreignKey: "clientId", as: "clientSales" });

  Sale.belongsTo(Branch, { foreignKey: "branchId", as: "saleBranch" });
  Branch.hasMany(Sale, { foreignKey: "branchId", as: "branchSales" });

  // --- SaleDetail, Sale & Variant ---
  SaleDetail.belongsTo(Sale, { foreignKey: "saleId", as: "detailSale" });
  Sale.hasMany(SaleDetail, { foreignKey: "saleId", as: "saleDetails" });

  SaleDetail.belongsTo(Variant, { foreignKey: "variantId", as: "detailVariant" });
  Variant.hasMany(SaleDetail, { foreignKey: "variantId", as: "variantSaleDetails" });

  console.log("🔗 Asociaciones de Sequelize inicializadas correctamente con alias únicos.");
};
