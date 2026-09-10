var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PASSWORD_HASHER } from './hashing/password-hasher.interface.js';
import { BcryptPasswordHasherService } from './hashing/bcrypt-password-hasher.service.js';
import { TOKEN_SERVICE } from './tokens/token.interface.js';
import { TokenService } from './tokens/token.service.js';
let SecurityModule = class SecurityModule {
};
SecurityModule = __decorate([
    Global(),
    Module({
        imports: [
            JwtModule.registerAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('environment.jwt.secret') ?? '',
                    signOptions: {
                        expiresIn: (configService.get('environment.jwt.expiresIn') ??
                            '1d'),
                    },
                }),
            }),
        ],
        providers: [
            BcryptPasswordHasherService,
            {
                provide: PASSWORD_HASHER,
                useExisting: BcryptPasswordHasherService,
            },
            TokenService,
            {
                provide: TOKEN_SERVICE,
                useExisting: TokenService,
            },
        ],
        exports: [
            JwtModule,
            BcryptPasswordHasherService,
            PASSWORD_HASHER,
            TokenService,
            TOKEN_SERVICE,
        ],
    })
], SecurityModule);
export { SecurityModule };
//# sourceMappingURL=security.module.js.map