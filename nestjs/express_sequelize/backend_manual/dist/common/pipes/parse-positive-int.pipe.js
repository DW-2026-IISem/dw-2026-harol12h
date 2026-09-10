var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, BadRequestException, } from '@nestjs/common';
let ParsePositiveIntPipe = class ParsePositiveIntPipe {
    transform(value) {
        const parsed = parseInt(value, 10);
        if (isNaN(parsed) || parsed <= 0) {
            throw new BadRequestException(`El valor '${value}' no es un entero positivo`);
        }
        return parsed;
    }
};
ParsePositiveIntPipe = __decorate([
    Injectable()
], ParsePositiveIntPipe);
export { ParsePositiveIntPipe };
//# sourceMappingURL=parse-positive-int.pipe.js.map