import { DomainException } from '../../../../../common/exceptions/domain.exception.js';
export class Order {
    id;
    clientId;
    orderDate;
    status;
    constructor(id, clientId, orderDate, status) {
        this.id = id;
        this.clientId = clientId;
        this.orderDate = orderDate;
        this.status = status;
        if (!clientId) {
            throw new DomainException('El pedido debe estar asociado a un cliente.');
        }
        if (!orderDate) {
            throw new DomainException('El pedido debe tener una fecha.');
        }
    }
    static create(props) {
        return new Order(null, props.clientId, props.orderDate, props.status);
    }
}
//# sourceMappingURL=order.entity.js.map