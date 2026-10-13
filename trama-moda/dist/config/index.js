"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const routes_1 = require("../routes");
class App {
    constructor(port) {
        this.port = port;
        this.routePrv = new routes_1.Routes();
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set("port", this.port || process.env.PORT || 4000);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.json({ project: "TramaModa", status: "running" });
        });
        this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
        this.routePrv.authRoutes.routes(this.app);
        this.routePrv.adminRoutes.routes(this.app);
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
    async listen() {
        const port = this.app.get("port");
        this.app.listen(port, () => {
            console.log(`🚀 Servidor ejecutándose en puerto ${port}`);
            console.log(`📑 Documentación Swagger disponible en: http://localhost:${port}/api-docs`);
        });
    }
}
exports.App = App;
//# sourceMappingURL=index.js.map