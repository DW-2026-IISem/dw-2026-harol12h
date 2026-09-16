import { Return } from '../../domain/entities/return.entity.js';
import { ReturnModel } from '../../infrastructure/persistence/models/return.model.js';

export class ReturnMapper {
  static toDomain(model: ReturnModel): Return {
    return Return.reconstitute({
      id: model.id,
      orderId: model.orderId,
      date: model.date,
      reason: model.reason,
      total: model.total,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toPersistence(entity: Return): any {
    return {
      id: entity.id,
      orderId: entity.orderId,
      date: entity.date,
      reason: entity.reason,
      total: entity.total,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
