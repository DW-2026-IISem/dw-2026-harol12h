import { Injectable, signal } from '@angular/core';
import {
  EffectivePermission,
  SessionProfile,
  SessionTokens,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class SessionStore {
  private readonly ACCESS_KEY = 'trama_moda_access_token';
  private readonly REFRESH_KEY = 'trama_moda_refresh_token';
  private readonly PROFILE_KEY = 'trama_moda_profile';
  private readonly PERMISSIONS_KEY = 'trama_moda_permissions';

  readonly profile = signal<SessionProfile | null>(this.readProfile());
  readonly permissions = signal<EffectivePermission[]>(
    this.readPermissions()
  );

  get accessToken(): string | null {
    return this.read(this.ACCESS_KEY);
  }

  get refreshToken(): string | null {
    return this.read(this.REFRESH_KEY);
  }

  get isAuthenticated(): boolean {
    return !!this.accessToken && !!this.profile();
  }

  saveTokens(tokens: SessionTokens): void {
    this.write(this.ACCESS_KEY, tokens.accessToken);
    this.write(this.REFRESH_KEY, tokens.refreshToken);
  }

  saveProfile(profile: SessionProfile): void {
    this.write(this.PROFILE_KEY, JSON.stringify(profile));
    this.profile.set(profile);
  }

  savePermissions(permissions: EffectivePermission[]): void {
    this.write(this.PERMISSIONS_KEY, JSON.stringify(permissions));
    this.permissions.set(permissions);
  }

  canPermission(method: string, path: string): boolean {
    const normalizePath = (value: string): string => {
      const withoutQuery = value.split('?')[0].split('#')[0];
      const single = withoutQuery.replace(/\/{2,}/g, '/');
      const trimmed = single.replace(/\/+$/, '');

      return trimmed === '' ? '/' : trimmed;
    };

    const pathMatches = (
      pattern: string,
      requestedPath: string
    ): boolean => {
      const patternParts = normalizePath(pattern).split('/');
      const pathParts = normalizePath(requestedPath).split('/');

      if (patternParts.length !== pathParts.length) {
        return false;
      }

      for (let i = 0; i < patternParts.length; i++) {
        if (patternParts[i].startsWith(':')) {
          continue;
        }

        if (patternParts[i] !== pathParts[i]) {
          return false;
        }
      }

      return true;
    };

    return this.permissions().some(
      (permission) =>
        permission.method.toUpperCase() === method.toUpperCase() &&
        pathMatches(permission.path, path)
    );
  }

  clear(): void {
    this.remove(this.ACCESS_KEY);
    this.remove(this.REFRESH_KEY);
    this.remove(this.PROFILE_KEY);
    this.remove(this.PERMISSIONS_KEY);

    this.profile.set(null);
    this.permissions.set([]);
  }

  private readProfile(): SessionProfile | null {
    const value = this.read(this.PROFILE_KEY);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as SessionProfile;
    } catch {
      return null;
    }
  }

  private readPermissions(): EffectivePermission[] {
    const value = this.read(this.PERMISSIONS_KEY);

    if (!value) {
      return [];
    }

    try {
      const parsed: unknown = JSON.parse(value);
      return Array.isArray(parsed)
        ? (parsed as EffectivePermission[])
        : [];
    } catch {
      return [];
    }
  }

  private read(key: string): string | null {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private write(key: string, value: string): void {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // La aplicación puede continuar si el almacenamiento no está disponible.
    }
  }

  private remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch {
      // No se interrumpe el cierre de sesión si falla el almacenamiento.
    }
  }
}
