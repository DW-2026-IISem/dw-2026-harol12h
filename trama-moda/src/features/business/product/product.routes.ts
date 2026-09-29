import { Application } from "express";
import { ProductController } from "./product.controller";

export class ProductRoutes {
  public productController: ProductController = new ProductController();

  public routes(app: Application): void {
    app
      .route("/api/productos")
      .get(this.productController.getAll.bind(this.productController))
      .post(this.productController.create.bind(this.productController));

    app
      .route("/api/productos/:id")
      .get(this.productController.getOne.bind(this.productController))
      .put(this.productController.updatePut.bind(this.productController))
      .patch(this.productController.updatePatch.bind(this.productController))
      .delete(this.productController.deletePhysical.bind(this.productController));

    app
      .route("/api/productos/:id/deactivate")
      .patch(this.productController.deleteLogical.bind(this.productController));
  }
}
