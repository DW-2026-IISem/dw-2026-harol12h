import { ApplicationException } from './application.exception.js';
export declare class EntityNotFoundException extends ApplicationException {
    constructor(entityName: string, identifier: string | number);
}
