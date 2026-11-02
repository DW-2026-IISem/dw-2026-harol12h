import { Status } from './api.model';
import { HttpMethod } from './resource.model';

/** POST /api/sesion/login. */
export interface LoginRequest {
  username: string;
  password: string;
}

/** Login y refresh responden con este DTO camelCase. */
export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresAt: string;
  tokenType: 'Bearer';
}

/** Respuesta directa de GET /api/sesion/me. */
export interface SessionProfile {
  id: number;
  username: string;
  email: string;
  status: Status;
}

/** Perfil efectivo; el backend actual solo expone método y ruta. */
export interface EffectivePermission {
  method: HttpMethod;
  path: string;
}

export type ProfilePayload = SessionProfile;

export interface PermissionsPayload {
  permissions: EffectivePermission[];
}

export interface AccessPayload {
  user: SessionProfile;
  permissions: EffectivePermission[];
}

export interface RefreshSessionRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}
