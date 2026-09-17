import { ReturnDetail } from '../../domain/entities/return-detail.entity.js';
import { ReturnDetailModel } from '../../infrastructure/persistence/models/return-detail.model.js';
export declare class ReturnDetailMapper {
    static toDomain(model: ReturnDetailModel): ReturnDetail;
    static toPersistence(entity: ReturnDetail): any;
}
