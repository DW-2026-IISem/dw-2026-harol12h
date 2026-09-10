import { SetMetadata } from '@nestjs/common';
export const RESOURCE_KEY = 'resource';
export const ResourceMeta = (path, method) => SetMetadata(RESOURCE_KEY, { path, method });
//# sourceMappingURL=resource.decorator.js.map