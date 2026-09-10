import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class SequelizeExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
