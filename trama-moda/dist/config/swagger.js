"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API TramaModa",
            version: "1.0.0",
            description: "Documentación interactiva de la API de TramaModa"
        },
        security: [{ bearerAuth: [] }],
        servers: [
            {
                url: "http://localhost:4000",
                description: "Servidor Local"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Ingresa tu token JWT para autenticarte"
                }
            }
        }
    },
    apis: ["./src/features/**/*.routes.ts", "./src/routes/*.ts"]
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map