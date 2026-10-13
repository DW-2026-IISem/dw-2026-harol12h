"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePath = normalizePath;
exports.pathMatches = pathMatches;
exports.isOperationGranted = isOperationGranted;
function normalizePath(path) {
    const withoutQuery = path.split("?")[0].split("#")[0];
    const single = withoutQuery.replace(/\/{2,}/g, "/");
    const trimmed = single.replace(/\/+$/, "");
    return trimmed === "" ? "/" : trimmed;
}
function pathMatches(pattern, path) {
    const patternParts = normalizePath(pattern).split("/");
    const pathParts = normalizePath(path).split("/");
    if (patternParts.length !== pathParts.length)
        return false;
    for (let i = 0; i < patternParts.length; i++) {
        const p = patternParts[i];
        if (p.startsWith(":"))
            continue;
        if (p !== pathParts[i])
            return false;
    }
    return true;
}
function isOperationGranted(granted, method, path) {
    const upper = method.toUpperCase();
    return granted.some((resource) => resource.method.toUpperCase() === upper && pathMatches(resource.path, path));
}
//# sourceMappingURL=resource-match.js.map