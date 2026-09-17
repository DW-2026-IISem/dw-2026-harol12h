import { ReturnDetail } from '../../domain/entities/return-detail.entity.js';
import { IReturnDetailRepository } from '../../domain/interfaces/return-detail-repository.interface.js';
export declare class ReturnDetailService {
    private readonly repository;
    constructor(repository: IReturnDetailRepository);
    processDetail(detail: ReturnDetail): Promise<ReturnDetail>;
}
