import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { Routes } from "../routes";

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings(): void {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ project: "TramaModa", status: "running" });
    });

    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    this.routePrv.clientRoutes.routes(this.app);
    this.routePrv.productRoutes.routes(this.app);
    this.routePrv.saleRoutes.routes(this.app);
    this.routePrv.saleDetailRoutes.routes(this.app);
    this.routePrv.collectionRoutes.routes(this.app);
    this.routePrv.variantRoutes.routes(this.app);
    this.routePrv.branchRoutes.routes(this.app);
    this.routePrv.inventoryRoutes.routes(this.app);
    this.routePrv.categoryRoutes.routes(this.app);
    this.routePrv.supplierRoutes.routes(this.app);
    this.routePrv.userRoutes.routes(this.app);
  }

  public async listen(): Promise<void> {
    const port = this.app.get("port");
    this.app.listen(port, () => {
      console.log(`🚀 Servidor ejecutándose en puerto ${port}`);
      console.log(`📑 Documentación Swagger disponible en: http://localhost:${port}/api-docs`);
    });
  }
}
import express, { Application, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import { Routes } from "../routes";

export class App {
  public app: Application;
  public routePrv: Routes = new Routes();

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings(): void {
    this.app.set("port", this.port || process.env.PORT || 4000);
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ project: "TramaModa", status: "running" });
    });

    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    this.routePrv.clientRoutes.routes(this.app);
    this.routePrv.productRoutes.routes(this.app);
    this.routePrv.saleRoutes.routes(this.app);
    this.routePrv.saleDetailRoutes.routes(this.app);
    this.routePrv.collectionRoutes.routes(this.app);
    this.routePrv.variantRoutes.routes(this.app);
    this.routePrv.branchRoutes.routes(this.app);
    this.routePrv.inventoryRoutes.routes(this.app);
    this.routePrv.categoryRoutes.routes(this.app);
    this.routePrv.supplierRoutes.routes(this.app);
    this.routePrv.userRoutes.routes(this.app);
  }

  public async listen(): Promise<void> {
    const port = this.app.get("port");
    this.app.listen(port, () => {
      console.log(`🚀 Servidor ejecutándose en puerto ${port}`);
      console.log(`📑 Documentación Swagger disponible en: http://localhost:${port}/api-docs`);
    });
  }
}
