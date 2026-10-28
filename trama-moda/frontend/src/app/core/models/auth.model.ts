import { Status } from './api.model';
import { HttpMethod } from './resource.model';
import { User } from './user.model';

/** Datos enviados al iniciar sesión. */
export interface LoginRequest {
  username: string;
  password: string;
}

/** Respuesta real del backend al iniciar o renovar una sesión. */
export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresAt: string;
  tokenType: 'Bearer' | string;
}

/** Perfil devuelto por GET /api/sesion/me. */
export interface SessionProfile {
  id: number;
  username: string;
  email: string;
  status: Status;
}

/** Permiso efectivo devuelto por el backend. */
export interface EffectivePermission {
  method: HttpMethod;
  path: string;
  resource_id?: number;
  description?: string | null;
  role_id?: number;
  role_name?: string;
}

export interface PermissionsPayload {
  permissions: EffectivePermission[];
}

export interface AccessPayload {
  user: User;
  permissions: EffectivePermission[];
}

/** Solicitud de renovación de tokens. */
export interface RefreshSessionRequest {
  refreshToken: string;
}

/** Solicitud para cerrar una sesión. */
export interface LogoutRequest {
  refreshToken: string;
}
