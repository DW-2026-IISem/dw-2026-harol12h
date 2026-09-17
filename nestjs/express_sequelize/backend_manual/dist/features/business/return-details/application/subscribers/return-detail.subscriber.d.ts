import { ReturnDetailCreatedEvent } from '../events/return-detail-created.event.js';
import { ReturnDetailUpdatedEvent } from '../events/return-detail-updated.event.js';
import { ReturnDetailDeletedEvent } from '../events/return-detail-deleted.event.js';
export declare class ReturnDetailSubscriber {
    handleCreated(event: ReturnDetailCreatedEvent): void;
    handleUpdated(event: ReturnDetailUpdatedEvent): void;
    handleDeleted(event: ReturnDetailDeletedEvent): void;
}
