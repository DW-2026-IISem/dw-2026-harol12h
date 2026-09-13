import { CreateCollectionDto } from '../../../application/dto/create-collection.dto.js';
import { UpdateCollectionDto } from '../../../application/dto/update-collection.dto.js';
import { CollectionFilterDto } from '../../../application/dto/collection-filter.dto.js';
import { CollectionResponseDto } from '../../../application/dto/collection-response.dto.js';
import { CreateCollectionUseCase } from '../../../application/use-cases/create-collection.use-case.js';
import { UpdateCollectionUseCase } from '../../../application/use-cases/update-collection.use-case.js';
import { DeleteCollectionUseCase } from '../../../application/use-cases/delete-collection.use-case.js';
import { GetCollectionUseCase } from '../../../application/use-cases/get-collection.use-case.js';
import { ListCollectionsUseCase } from '../../../application/use-cases/list-collections.use-case.js';
export declare class CollectionsController {
    private readonly createCollectionUseCase;
    private readonly updateCollectionUseCase;
    private readonly deleteCollectionUseCase;
    private readonly getCollectionUseCase;
    private readonly listCollectionsUseCase;
    constructor(createCollectionUseCase: CreateCollectionUseCase, updateCollectionUseCase: UpdateCollectionUseCase, deleteCollectionUseCase: DeleteCollectionUseCase, getCollectionUseCase: GetCollectionUseCase, listCollectionsUseCase: ListCollectionsUseCase);
    create(dto: CreateCollectionDto): Promise<CollectionResponseDto>;
    findAll(filter: CollectionFilterDto): Promise<{
        items: CollectionResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface.js").PaginationMeta;
    }>;
    findOne(id: number): Promise<CollectionResponseDto>;
    update(id: number, dto: UpdateCollectionDto): Promise<CollectionResponseDto>;
    remove(id: number): Promise<void>;
}
