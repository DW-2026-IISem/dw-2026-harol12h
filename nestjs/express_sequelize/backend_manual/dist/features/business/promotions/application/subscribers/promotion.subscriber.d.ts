import { PromotionCreatedEvent } from '../events/promotion-created.event.js';
import { PromotionUpdatedEvent } from '../events/promotion-updated.event.js';
import { PromotionDeletedEvent } from '../events/promotion-deleted.event.js';
export declare class PromotionSubscriber {
    handleCreated(event: PromotionCreatedEvent): void;
    handleUpdated(event: PromotionUpdatedEvent): void;
    handleDeleted(event: PromotionDeletedEvent): void;
}
