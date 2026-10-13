"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importación de modelos RBAC para que Sequelize los registre
require("../features/auth/users/user.model");
require("../features/auth/roles/role.model");
require("../features/auth/resources/resource.model");
require("../features/auth/role-users/role-user.model");
require("../features/auth/resource-roles/resource-role.model");
require("../features/auth/refresh-tokens/refresh-token.model");
// Cargamos el grafo de asociaciones RBAC
require("../features/auth/rbac.associations");
console.log("✅ Modelos y asociaciones RBAC registrados en Sequelize.");
//# sourceMappingURL=register-models.js.map