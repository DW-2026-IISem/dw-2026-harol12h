import { Application } from "express";
import { SaleController } from "./sale.controller";

export class SaleRoutes {
  public saleController: SaleController = new SaleController();

  public routes(app: Application): void {
    app
      .route("/api/ventas")
      .get(this.saleController.getAll.bind(this.saleController))
      .post(this.saleController.create.bind(this.saleController));

    app
      .route("/api/ventas/:id")
      .get(this.saleController.getOne.bind(this.saleController));

    app
      .route("/api/ventas/:id/deactivate")
      .patch(this.saleController.deleteLogical.bind(this.saleController));
  }
}
