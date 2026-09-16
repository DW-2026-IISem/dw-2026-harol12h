import { Return } from '../../domain/entities/return.entity.js';
import { ReturnModel } from '../../infrastructure/persistence/models/return.model.js';
export declare class ReturnMapper {
    static toDomain(model: ReturnModel): Return;
    static toPersistence(entity: Return): any;
}
