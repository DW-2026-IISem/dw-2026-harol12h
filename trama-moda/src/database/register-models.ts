// Importación de modelos RBAC para que Sequelize los registre
import "../features/auth/users/user.model";
import "../features/auth/roles/role.model";
import "../features/auth/resources/resource.model";
import "../features/auth/role-users/role-user.model";
import "../features/auth/resource-roles/resource-role.model";
import "../features/auth/refresh-tokens/refresh-token.model";

// Cargamos el grafo de asociaciones RBAC
import "../features/auth/rbac.associations";

console.log("✅ Modelos y asociaciones RBAC registrados en Sequelize.");
