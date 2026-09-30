import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API TramaModa",
      version: "1.0.0",
      description: "Documentación interactiva de la API de TramaModa (Clientes, Productos, Ventas)"
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Servidor Local"
      }
    ]
  },
  apis: ["./src/features/**/*.routes.ts"]
};

export const swaggerSpec = swaggerJSDoc(options);
