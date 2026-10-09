import { App } from "./config";
import { testConnection, syncDatabase } from "./database/db";

async function main() {
  const isConnected = await testConnection();

  if (!isConnected) {
    throw new Error("No se pudo conectar con la base de datos; el servidor no se iniciará.");
  }

  await syncDatabase();

  const app = new App();
  await app.listen();
}

main();
