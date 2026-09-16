export class OrderDetailNotFoundException extends Error {
    constructor(id) { super('Detalle de pedido con ID "+id+" no encontrado'); this.name = "OrderDetailNotFoundException"; }
}
//# sourceMappingURL=order-detail-not-found.exception.js.map