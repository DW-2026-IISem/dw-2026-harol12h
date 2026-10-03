import { ClientRoutes } from "../features/business/client/client.routes";
import { ProductRoutes } from "../features/business/product/product.routes";
import { SaleRoutes } from "../features/business/sale/sale.routes";
import { SaleDetailRoutes } from "../features/business/sale/sale-detail.routes";
import { CollectionRoutes } from "../features/business/catalog/collection.routes";
import { VariantRoutes } from "../features/business/variants/variant.routes";
import { BranchRoutes } from "../features/business/branch/branch.routes";
import { InventoryRoutes } from "../features/business/inventory/inventory.routes";
import { CategoryRoutes } from "../features/business/category/category.routes";
import { SupplierRoutes } from "../features/business/supplier/supplier.routes";
import { UserRoutes } from "../features/business/user/user.routes";
import { AuthRoutes } from "../features/auth/auth.routes";

export class Routes {
  public clientRoutes: ClientRoutes = new ClientRoutes();
  public productRoutes: ProductRoutes = new ProductRoutes();
  public saleRoutes: SaleRoutes = new SaleRoutes();
  public saleDetailRoutes: SaleDetailRoutes = new SaleDetailRoutes();
  public collectionRoutes: CollectionRoutes = new CollectionRoutes();
  public variantRoutes: VariantRoutes = new VariantRoutes();
  public branchRoutes: BranchRoutes = new BranchRoutes();
  public inventoryRoutes: InventoryRoutes = new InventoryRoutes();
  public categoryRoutes: CategoryRoutes = new CategoryRoutes();
  public supplierRoutes: SupplierRoutes = new SupplierRoutes();
  public userRoutes: UserRoutes = new UserRoutes();
  public authRoutes: AuthRoutes = new AuthRoutes();
}
