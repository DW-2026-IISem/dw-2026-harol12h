import { ClientRoutes } from "../features/business/client/client.routes";
import { ProductRoutes } from "../features/business/product/product.routes";

export class Routes {
  public clientRoutes: ClientRoutes = new ClientRoutes();
  public productRoutes: ProductRoutes = new ProductRoutes();
}
