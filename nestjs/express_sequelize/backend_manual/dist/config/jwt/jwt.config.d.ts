export declare const jwtConfig: (() => {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
}>;
