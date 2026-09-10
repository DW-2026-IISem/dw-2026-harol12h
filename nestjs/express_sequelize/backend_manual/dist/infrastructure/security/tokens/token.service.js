var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
let TokenService = class TokenService {
    jwtService;
    configService;
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signAccessToken(payload) {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get('environment.jwt.secret'),
            expiresIn: this.configService.get('environment.jwt.expiresIn'),
        });
    }
    async signRefreshToken(payload) {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get('environment.jwt.refreshSecret'),
            expiresIn: this.configService.get('environment.jwt.refreshExpiresIn'),
        });
    }
    async verifyAccessToken(token) {
        return this.jwtService.verifyAsync(token, {
            secret: this.configService.get('environment.jwt.secret'),
        });
    }
    async verifyRefreshToken(token) {
        return this.jwtService.verifyAsync(token, {
            secret: this.configService.get('environment.jwt.refreshSecret'),
        });
    }
    async issueTokens(payload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken(payload),
            this.signRefreshToken(payload),
        ]);
        return {
            accessToken,
            refreshToken,
            expiresIn: this.configService.get('environment.jwt.expiresIn') || '1d',
        };
    }
};
TokenService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [JwtService,
        ConfigService])
], TokenService);
export { TokenService };
//# sourceMappingURL=token.service.js.map