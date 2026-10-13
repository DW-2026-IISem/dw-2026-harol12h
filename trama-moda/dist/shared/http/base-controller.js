"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const app_error_1 = require("../errors/app-error");
const error_response_1 = require("./error-response");
class BaseController {
    async run(res, work) {
        try {
            await work();
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    paramId(req) {
        const raw = req.params.id;
        const value = Array.isArray(raw) ? raw[0] : raw;
        if (!value || !/^\d+$/.test(value) || Number(value) < 1) {
            throw new app_error_1.AppError(400, "Invalid id: must be a positive integer");
        }
        return Number(value);
    }
    handleError(res, error) {
        (0, error_response_1.sendError)(res, error);
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base-controller.js.map