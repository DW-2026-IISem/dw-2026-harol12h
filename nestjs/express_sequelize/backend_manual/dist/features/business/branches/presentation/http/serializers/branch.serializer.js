import { BranchMapper } from '../../../application/mappers/branch.mapper.js';
export class BranchSerializer {
    static serialize(entity) {
        return BranchMapper.toResponse(entity);
    }
}
//# sourceMappingURL=branch.serializer.js.map