import { App } from "./config";
import { testConnection, syncDatabase } from "./database/db";

async function main() {
  const isConnected = await testConnection();

  if (isConnected) {
    await syncDatabase();
  }

  const app = new App();
  await app.listen();
}

main();
