export declare class ApplicationException extends Error {
    readonly message: string;
    readonly statusCode: number;
    readonly timestamp: string;
    constructor(message: string, statusCode?: number);
}
