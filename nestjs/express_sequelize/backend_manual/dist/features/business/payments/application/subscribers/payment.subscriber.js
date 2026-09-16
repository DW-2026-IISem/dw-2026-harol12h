export class PaymentSubscriber {
    handlePaymentCreated(event) {
        console.log('Evento: Pago creado', event);
    }
    handlePaymentUpdated(event) {
        console.log('Evento: Pago actualizado', event);
    }
    handlePaymentDeleted(event) {
        console.log('Evento: Pago eliminado', event);
    }
}
//# sourceMappingURL=payment.subscriber.js.map