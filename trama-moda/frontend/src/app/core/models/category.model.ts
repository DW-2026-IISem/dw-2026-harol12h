import { Timestamps } from './api.model';

/** Categorías comerciales de TramaModa. */
export interface Category extends Timestamps {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface CategoryPayload {
  name: string;
  description?: string;
  is_active: boolean;
}
