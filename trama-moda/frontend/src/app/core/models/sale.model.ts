
import { Money, Status, Timestamps } from './api.model';
import { SaleDetail } from './sale-detail.model';
import { Client } from './client.model';

export interface Sale extends Timestamps {
  id: number;
  client_id: number;
  fecha?: string;
  monto_total: Money;
  status: Status;

  // Asociaciones devueltas por el backend.
  client?: Client;
  details?: SaleDetail[];
}

export interface SalePayload {
  client_id: number;
  fecha?: string;
  monto_total: number;
  status?: Status;
}

