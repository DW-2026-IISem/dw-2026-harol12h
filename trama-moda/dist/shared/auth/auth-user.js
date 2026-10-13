"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthUser = requireAuthUser;
const app_error_1 = require("../errors/app-error");
function requireAuthUser(req) {
    if (!req.auth) {
        throw new app_error_1.AppError(401, "Authentication required");
    }
    return req.auth;
}
//# sourceMappingURL=auth-user.js.map