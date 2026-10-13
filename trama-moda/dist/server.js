"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const db_1 = require("./database/db");
async function main() {
    const isConnected = await (0, db_1.testConnection)();
    if (!isConnected) {
        throw new Error("No se pudo conectar con la base de datos; el servidor no se iniciará.");
    }
    await (0, db_1.syncDatabase)();
    const app = new config_1.App();
    await app.listen();
}
main();
//# sourceMappingURL=server.js.map