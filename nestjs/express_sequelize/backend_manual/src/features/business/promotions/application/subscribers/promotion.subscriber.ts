import { PromotionCreatedEvent } from '../events/promotion-created.event.js';
import { PromotionUpdatedEvent } from '../events/promotion-updated.event.js';
import { PromotionDeletedEvent } from '../events/promotion-deleted.event.js';

export class PromotionSubscriber {
  handleCreated(event: PromotionCreatedEvent) {
    console.log('Evento: Promoción creada', event);
  }

  handleUpdated(event: PromotionUpdatedEvent) {
    console.log('Evento: Promoción actualizada', event);
  }

  handleDeleted(event: PromotionDeletedEvent) {
    console.log('Evento: Promoción eliminada', event);
  }
}
