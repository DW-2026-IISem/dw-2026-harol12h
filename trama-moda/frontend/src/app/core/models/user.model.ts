import { Status, Timestamps } from './api.model';

/** Usuario del módulo de autenticación. Nunca incluye la contraseña en la respuesta. */
export interface User extends Timestamps {
  id: number;
  username: string;
  email: string;
  avatar?: string | null;
  status: Status;
}

export interface UserPayload {
  username: string;
  email: string;
  password?: string;
  avatar?: string | null;
  status?: Status;
}
