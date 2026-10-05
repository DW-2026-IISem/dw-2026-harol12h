import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API TramaModa",
      version: "1.0.0",
      description: "Documentación interactiva de la API de TramaModa"
    },
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

export const swaggerSpec = swaggerJSDoc(options);
