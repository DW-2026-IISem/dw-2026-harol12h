import { Injectable, computed, signal } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
  AccessPayload,
  EffectivePermission,
  SessionProfile,
  SessionTokens,
} from '../models/auth.model';

const STORAGE_KEY = 'trama-moda.session.v1';

interface PersistedSession {
  accessToken: string | null;
  refreshToken: string | null;
  profile: SessionProfile | null;
  permissions: EffectivePermission[];
}

@Injectable({ providedIn: 'root' })
export class SessionStore {
  readonly authEnabled = environment.requireAuth;

  private readonly _accessToken = signal<string | null>(null);
  private readonly _refreshToken = signal<string | null>(null);
  private readonly _profile = signal<SessionProfile | null>(null);
  private readonly _permissions = signal<EffectivePermission[]>([]);

  readonly accessToken = this._accessToken.asReadonly();
  readonly refreshToken = this._refreshToken.asReadonly();
  readonly profile = this._profile.asReadonly();
  readonly user = this.profile;
  readonly permissions = this._permissions.asReadonly();
  readonly isAuthenticated = computed(
    () => this._accessToken() !== null && this._profile() !== null,
  );
  readonly permissionCount = computed(() => this._permissions().length);

  constructor() {
    this.restore();
  }

  saveTokens(tokens: SessionTokens): void {
    this._accessToken.set(tokens.accessToken);
    this._refreshToken.set(tokens.refreshToken);
    this.persist();
  }

  saveAccess(access: AccessPayload): void {
    this._profile.set(access.user);
    this.savePermissions(access.permissions);
  }

  savePermissions(permissions: EffectivePermission[]): void {
    this._permissions.set(permissions);
    this.persist();
  }

  clear(): void {
    this._accessToken.set(null);
    this._refreshToken.set(null);
    this._profile.set(null);
    this._permissions.set([]);

    try {
      globalThis.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage can be unavailable in restricted browser contexts.
    }
  }

  canPermission(method: string, path: string): boolean {
    if (!this.authEnabled) {
      return true;
    }

    return this._permissions().some(
      (permission) =>
        permission.method.toUpperCase() === method.toUpperCase() &&
        this.pathMatches(permission.path, path),
    );
  }

  private restore(): void {
    try {
      const raw = globalThis.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }

      const parsed: unknown = JSON.parse(raw);
      if (!this.isPersistedSession(parsed)) {
        this.clear();
        return;
      }

      this._accessToken.set(parsed.accessToken);
      this._refreshToken.set(parsed.refreshToken);
      this._profile.set(parsed.profile);
      this._permissions.set(parsed.permissions);
    } catch {
      this.clear();
    }
  }

  private persist(): void {
    try {
      const session: PersistedSession = {
        accessToken: this._accessToken(),
        refreshToken: this._refreshToken(),
        profile: this._profile(),
        permissions: this._permissions(),
      };
      globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Keep the in-memory session usable when browser storage is unavailable.
    }
  }

  private isPersistedSession(value: unknown): value is PersistedSession {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const session = value as Partial<PersistedSession>;
    const profile = session.profile;
    const validProfile =
      profile === null ||
      (typeof profile === 'object' &&
        profile !== null &&
        typeof profile.id === 'number' &&
        typeof profile.username === 'string' &&
        typeof profile.email === 'string' &&
        (profile.status === 'active' || profile.status === 'inactive'));

    return (
      (typeof session.accessToken === 'string' || session.accessToken === null) &&
      (typeof session.refreshToken === 'string' || session.refreshToken === null) &&
      validProfile &&
      Array.isArray(session.permissions) &&
      session.permissions.every(
        (permission) =>
          typeof permission === 'object' &&
          permission !== null &&
          typeof permission.method === 'string' &&
          typeof permission.path === 'string',
      )
    );
  }

  private pathMatches(pattern: string, requestedPath: string): boolean {
    const normalize = (value: string): string | null => {
      const path = value.split(/[?#]/, 1)[0];
      if (!path.startsWith('/')) {
        return null;
      }

      return path.length > 1 ? path.replace(/\/+$/, '') : '/';
    };

    const normalizedPattern = normalize(pattern);
    const normalizedRequest = normalize(requestedPath);
    if (normalizedPattern === null || normalizedRequest === null) {
      return false;
    }

    const patternParts = normalizedPattern.split('/');
    const requestedParts = normalizedRequest.split('/');

    return (
      patternParts.length === requestedParts.length &&
      patternParts.every((part, index) => {
        if (part.startsWith(':')) {
          return /^:[A-Za-z][A-Za-z0-9_]*$/.test(part) && requestedParts[index].length > 0;
        }

        return part === requestedParts[index];
      })
    );
  }
}
