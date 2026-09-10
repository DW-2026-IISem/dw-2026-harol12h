import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ITokenService, IssuedTokens, TokenPayload } from './token.interface.js';
export declare class TokenService implements ITokenService {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    signAccessToken(payload: TokenPayload): Promise<string>;
    signRefreshToken(payload: TokenPayload): Promise<string>;
    verifyAccessToken(token: string): Promise<TokenPayload>;
    verifyRefreshToken(token: string): Promise<TokenPayload>;
    issueTokens(payload: TokenPayload): Promise<IssuedTokens>;
}
