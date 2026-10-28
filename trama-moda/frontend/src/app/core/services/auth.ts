
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
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
    return this.sessionStore.isAuthenticated;
  }

  get profile(): SessionProfile | null {
    return this.sessionStore.profile();
  }

  login(credentials: LoginRequest): Observable<SessionProfile> {
    return this.sessionApi.login(credentials).pipe(
      tap((tokens: SessionTokens) => this.sessionStore.saveTokens(tokens)),
      switchMap(() => this.sessionApi.me()),
      tap((profile) => this.sessionStore.saveProfile(profile)),
      switchMap((profile) =>
        this.sessionApi.permissions().pipe(
          tap((permissions) =>
            this.sessionStore.savePermissions(permissions),
          ),
          map(() => profile),
        ),
      ),
      catchError((error: unknown) => {
        this.sessionStore.clear();
        return throwError(() => error);
      }),
    );
  }

  logout(): Observable<void> {
    const refreshToken = this.sessionStore.refreshToken;

    if (!refreshToken) {
      this.sessionStore.clear();
      return new Observable<void>((subscriber) => {
        subscriber.next();
        subscriber.complete();
      });
    }

    return this.sessionApi.logout({ refreshToken }).pipe(
      map(() => undefined),
      catchError(() => {
        // La sesión local se cierra incluso si el servidor no responde.
        return new Observable<void>((subscriber) => {
          subscriber.next();
          subscriber.complete();
        });
      }),
      tap(() => this.sessionStore.clear()),
    );
  }
}

