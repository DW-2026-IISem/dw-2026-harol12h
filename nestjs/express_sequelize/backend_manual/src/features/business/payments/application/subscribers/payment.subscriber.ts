import { PaymentCreatedEvent } from '../events/payment-created.event.js';
import { PaymentUpdatedEvent } from '../events/payment-updated.event.js';
import { PaymentDeletedEvent } from '../events/payment-deleted.event.js';

export class PaymentSubscriber {
  handlePaymentCreated(event: PaymentCreatedEvent) {
    console.log('Evento: Pago creado', event);
  }

  handlePaymentUpdated(event: PaymentUpdatedEvent) {
    console.log('Evento: Pago actualizado', event);
  }

  handlePaymentDeleted(event: PaymentDeletedEvent) {
    console.log('Evento: Pago eliminado', event);
  }
}
