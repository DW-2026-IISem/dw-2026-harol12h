import { App } from "./config";

async function main() {

  const app = new App();

  await app.listen();

}

main();
