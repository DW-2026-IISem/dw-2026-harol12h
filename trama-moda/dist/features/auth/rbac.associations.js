"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./users/user.model");
const role_model_1 = require("./roles/role.model");
const resource_model_1 = require("./resources/resource.model");
const role_user_model_1 = require("./role-users/role-user.model");
const resource_role_model_1 = require("./resource-roles/resource-role.model");
const refresh_token_model_1 = require("./refresh-tokens/refresh-token.model");
resource_role_model_1.ResourceRole.belongsTo(role_model_1.Role, { foreignKey: "role_id", as: "role" });
resource_role_model_1.ResourceRole.belongsTo(resource_model_1.Resource, { foreignKey: "resource_id", as: "resource" });
role_model_1.Role.hasMany(resource_role_model_1.ResourceRole, { foreignKey: "role_id", as: "resource_roles" });
resource_model_1.Resource.hasMany(resource_role_model_1.ResourceRole, { foreignKey: "resource_id", as: "resource_roles" });
role_user_model_1.RoleUser.belongsTo(user_model_1.User, { foreignKey: "user_id", as: "user" });
role_user_model_1.RoleUser.belongsTo(role_model_1.Role, { foreignKey: "role_id", as: "role" });
user_model_1.User.hasMany(role_user_model_1.RoleUser, { foreignKey: "user_id", as: "role_users" });
role_model_1.Role.hasMany(role_user_model_1.RoleUser, { foreignKey: "role_id", as: "role_users" });
refresh_token_model_1.RefreshToken.belongsTo(user_model_1.User, { foreignKey: "user_id", as: "user" });
user_model_1.User.hasMany(refresh_token_model_1.RefreshToken, { foreignKey: "user_id", as: "refresh_tokens" });
//# sourceMappingURL=rbac.associations.js.map