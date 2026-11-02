import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  finalize,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import {
  AccessPayload,
  EffectivePermission,
  LoginRequest,
  SessionProfile,
  SessionTokens,
} from '../models/auth.model';
import { SessionApi } from './session-api';
import { SessionStore } from './session-store';

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly sessionApi = inject(SessionApi);
  private readonly sessionStore = inject(SessionStore);

  get isAuthenticated(): boolean {
    return this.sessionStore.isAuthenticated();
  }

  get profile(): SessionProfile | null {
    return this.sessionStore.profile();
  }

  login(credentials: LoginRequest): Observable<SessionProfile> {
    return this.sessionApi.login(credentials).pipe(
      tap((tokens) => this.sessionStore.saveTokens(tokens)),
      switchMap(() => this.loadAccess()),
      map((access) => access.user),
      catchError((error: unknown) => {
        this.sessionStore.clear();
        return throwError(() => error);
      }),
    );
  }

  loadAccess(notifyErrors = false): Observable<AccessPayload> {
    return forkJoin({
      user: this.sessionApi.me(notifyErrors),
      permissions: this.sessionApi.permissions(notifyErrors),
    }).pipe(tap((access) => this.sessionStore.saveAccess(access)));
  }

  refreshPermissions(): Observable<EffectivePermission[]> {
    return this.sessionApi
      .permissions(true)
      .pipe(tap((permissions) => this.sessionStore.savePermissions(permissions)));
  }

  refresh(): Observable<SessionTokens> {
    const refreshToken = this.sessionStore.refreshToken();
    if (!refreshToken) {
      this.sessionStore.clear();
      return throwError(() => new Error('No hay refresh token disponible.'));
    }

    return this.sessionApi
      .refresh({ refreshToken })
      .pipe(tap((tokens) => this.sessionStore.saveTokens(tokens)));
  }

  logout(): Observable<boolean> {
    const refreshToken = this.sessionStore.refreshToken();
    if (!refreshToken) {
      this.sessionStore.clear();
      return of(false);
    }

    return this.sessionApi.logout({ refreshToken }).pipe(
      map(() => true),
      catchError(() => of(false)),
      finalize(() => this.sessionStore.clear()),
    );
  }
}
