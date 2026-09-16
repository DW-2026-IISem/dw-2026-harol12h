import { PaymentCreatedEvent } from '../events/payment-created.event.js';
import { PaymentUpdatedEvent } from '../events/payment-updated.event.js';
import { PaymentDeletedEvent } from '../events/payment-deleted.event.js';
export declare class PaymentSubscriber {
    handlePaymentCreated(event: PaymentCreatedEvent): void;
    handlePaymentUpdated(event: PaymentUpdatedEvent): void;
    handlePaymentDeleted(event: PaymentDeletedEvent): void;
}
