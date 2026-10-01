import { ClientRoutes } from "../features/business/client/client.routes";
import { ProductRoutes } from "../features/business/product/product.routes";
import { SaleRoutes } from "../features/business/sale/sale.routes";
import { SaleDetailRoutes } from "../features/business/sale/sale-detail.routes";
import { CollectionRoutes } from "../features/business/catalog/collection.routes";
import { VariantRoutes } from "../features/business/variants/variant.routes";
import { BranchRoutes } from "../features/business/branch/branch.routes";

export class Routes {
  public clientRoutes: ClientRoutes = new ClientRoutes();
  public productRoutes: ProductRoutes = new ProductRoutes();
  public saleRoutes: SaleRoutes = new SaleRoutes();
  public saleDetailRoutes: SaleDetailRoutes = new SaleDetailRoutes();
  public collectionRoutes: CollectionRoutes = new CollectionRoutes();
  public variantRoutes: VariantRoutes = new VariantRoutes();
  public branchRoutes: BranchRoutes = new BranchRoutes();
}
