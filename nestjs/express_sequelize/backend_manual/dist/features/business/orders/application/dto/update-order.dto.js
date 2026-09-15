import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto.js';
export class UpdateOrderDto extends PartialType(CreateOrderDto) {
}
//# sourceMappingURL=update-order.dto.js.map