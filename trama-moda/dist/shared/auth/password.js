"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = void 0;
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.sha256Hex = sha256Hex;
exports.generateOpaqueToken = generateOpaqueToken;
const bcryptjs_1 = require("bcryptjs");
const node_crypto_1 = require("node:crypto");
const SALT_ROUNDS = 12;
async function hashPassword(plain) {
    return (0, bcryptjs_1.hash)(plain, SALT_ROUNDS);
}
async function comparePassword(plain, passwordHash) {
    return (0, bcryptjs_1.compare)(plain, passwordHash);
}
exports.verifyPassword = comparePassword;
function sha256Hex(value) {
    return (0, node_crypto_1.createHash)("sha256").update(value).digest("hex");
}
function generateOpaqueToken() {
    return (0, node_crypto_1.randomBytes)(64).toString("base64url");
}
//# sourceMappingURL=password.js.map