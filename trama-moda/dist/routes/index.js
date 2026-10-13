"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const client_routes_1 = require("../features/business/client/client.routes");
const product_routes_1 = require("../features/business/product/product.routes");
const sale_routes_1 = require("../features/business/sale/sale.routes");
const sale_detail_routes_1 = require("../features/business/sale-detail/sale-detail.routes");
const collection_routes_1 = require("../features/business/catalog/collection.routes");
const variant_routes_1 = require("../features/business/variants/variant.routes");
const branch_routes_1 = require("../features/business/branch/branch.routes");
const inventory_routes_1 = require("../features/business/inventory/inventory.routes");
const category_routes_1 = require("../features/business/category/category.routes");
const supplier_routes_1 = require("../features/business/supplier/supplier.routes");
const user_routes_1 = require("../features/business/user/user.routes");
const auth_routes_1 = require("../features/auth/auth.routes");
const admin_routes_1 = require("../features/auth/admin.routes");
class Routes {
    constructor() {
        this.clientRoutes = new client_routes_1.ClientRoutes();
        this.productRoutes = new product_routes_1.ProductRoutes();
        this.saleRoutes = new sale_routes_1.SaleRoutes();
        this.saleDetailRoutes = new sale_detail_routes_1.SaleDetailRoutes();
        this.collectionRoutes = new collection_routes_1.CollectionRoutes();
        this.variantRoutes = new variant_routes_1.VariantRoutes();
        this.branchRoutes = new branch_routes_1.BranchRoutes();
        this.inventoryRoutes = new inventory_routes_1.InventoryRoutes();
        this.categoryRoutes = new category_routes_1.CategoryRoutes();
        this.supplierRoutes = new supplier_routes_1.SupplierRoutes();
        this.userRoutes = new user_routes_1.UserRoutes();
        this.authRoutes = new auth_routes_1.AuthRoutes();
        this.adminRoutes = new admin_routes_1.AdminRoutes();
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map