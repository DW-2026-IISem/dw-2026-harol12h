import { ReturnDetailCreatedEvent } from '../events/return-detail-created.event.js';
import { ReturnDetailUpdatedEvent } from '../events/return-detail-updated.event.js';
import { ReturnDetailDeletedEvent } from '../events/return-detail-deleted.event.js';

export class ReturnDetailSubscriber {
  handleCreated(event: ReturnDetailCreatedEvent) {
    console.log('Evento: Detalle de devolución creado', event);
  }

  handleUpdated(event: ReturnDetailUpdatedEvent) {
    console.log('Evento: Detalle de devolución actualizado', event);
  }

  handleDeleted(event: ReturnDetailDeletedEvent) {
    console.log('Evento: Detalle de devolución eliminado', event);
  }
}
