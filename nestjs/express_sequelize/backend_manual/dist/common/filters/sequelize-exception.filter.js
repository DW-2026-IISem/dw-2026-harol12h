var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Catch } from '@nestjs/common';
let SequelizeExceptionFilter = class SequelizeExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const sequelizeErrors = [
            'SequelizeUniqueConstraintError',
            'SequelizeForeignKeyConstraintError',
            'SequelizeConnectionError',
            'SequelizeValidationError',
            'SequelizeDatabaseError',
        ];
        if (!exception?.name || !sequelizeErrors.includes(exception.name)) {
            throw exception;
        }
        let status = 500;
        let message = 'Error de base de datos';
        if (exception.name === 'SequelizeUniqueConstraintError') {
            status = 409;
            message = 'El recurso ya existe (violación de unicidad)';
        }
        else if (exception.name === 'SequelizeForeignKeyConstraintError') {
            status = 400;
            message = 'Violación de clave foránea';
        }
        else if (exception.name === 'SequelizeConnectionError') {
            status = 503;
            message = 'No se pudo conectar a la base de datos';
        }
        else if (exception.name === 'SequelizeValidationError') {
            status = 422;
            message = exception.message || 'Error de validación en base de datos';
        }
        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
        });
    }
};
SequelizeExceptionFilter = __decorate([
    Catch()
], SequelizeExceptionFilter);
export { SequelizeExceptionFilter };
//# sourceMappingURL=sequelize-exception.filter.js.map