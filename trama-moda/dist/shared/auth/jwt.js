"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCESS_TOKEN_TTL_SECONDS = exports.TOKEN_AUDIENCE = exports.TOKEN_ISSUER = void 0;
exports.signAccessToken = signAccessToken;
exports.verifyAccessToken = verifyAccessToken;
exports.extractBearerToken = extractBearerToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const node_crypto_1 = require("node:crypto");
const app_error_1 = require("../errors/app-error");
const ALGORITHM = "HS256";
exports.TOKEN_ISSUER = "trama-moda-express";
exports.TOKEN_AUDIENCE = "trama-moda-api";
exports.ACCESS_TOKEN_TTL_SECONDS = Number(process.env.JWT_ACCESS_TTL ?? 900);
function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new app_error_1.AppError(500, "JWT_SECRET no configurado (mínimo 32 caracteres). Ver .env");
    }
    return secret;
}
function getAccessTokenTtl() {
    if (!Number.isInteger(exports.ACCESS_TOKEN_TTL_SECONDS) || exports.ACCESS_TOKEN_TTL_SECONDS < 1) {
        throw new app_error_1.AppError(500, "JWT_ACCESS_TTL must be a positive integer");
    }
    return exports.ACCESS_TOKEN_TTL_SECONDS;
}
function signAccessToken(user) {
    const expiresIn = getAccessTokenTtl();
    const token = jsonwebtoken_1.default.sign({ username: user.username }, getSecret(), {
        algorithm: ALGORITHM,
        subject: String(user.id),
        issuer: exports.TOKEN_ISSUER,
        audience: exports.TOKEN_AUDIENCE,
        expiresIn,
        jwtid: (0, node_crypto_1.randomUUID)(),
    });
    return { token, expiresIn };
}
function verifyAccessToken(token) {
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, getSecret(), {
            algorithms: [ALGORITHM],
            issuer: exports.TOKEN_ISSUER,
            audience: exports.TOKEN_AUDIENCE,
            clockTolerance: 5,
        });
    }
    catch {
        throw new app_error_1.AppError(401, "Invalid or expired access token");
    }
    if (typeof payload.sub !== "string" ||
        !/^[1-9]\d*$/.test(payload.sub) ||
        typeof payload.jti !== "string" ||
        payload.jti.length === 0) {
        throw new app_error_1.AppError(401, "Invalid or expired access token");
    }
    return payload;
}
function extractBearerToken(header) {
    if (!header)
        return null;
    const match = /^Bearer\s+(\S+)$/i.exec(header.trim());
    return match?.[1] ?? null;
}
//# sourceMappingURL=jwt.js.map