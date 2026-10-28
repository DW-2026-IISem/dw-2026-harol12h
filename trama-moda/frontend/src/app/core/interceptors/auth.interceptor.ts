import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  catchError,
  finalize,
  shareReplay,
  switchMap,
  tap,
  throwError,
  Observable,
} from 'rxjs';

import { SessionTokens } from '../models/auth.model';
import { SessionApi } from '../services/session-api';
import { SessionStore } from '../services/session-store';

let refreshRequest: Observable<SessionTokens> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(SessionStore);
  const sessionApi = inject(SessionApi);

  const isSessionEndpoint =
    /\/sesion\/(login|refresh|logout)(?:\?|$)/i.test(req.url);

  const token = store.accessToken;

  const request = token && !isSessionEndpoint
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(request).pipe(
    catchError((error: unknown) => {
      if (
        !(error instanceof HttpErrorResponse) ||
        error.status !== 401 ||
        isSessionEndpoint
      ) {
        return throwError(() => error);
      }

      const refreshToken = store.refreshToken;

      if (!refreshToken) {
        store.clear();
        return throwError(() => error);
      }

      if (!refreshRequest) {
        refreshRequest = sessionApi.refresh({ refreshToken }).pipe(
          tap((tokens) => store.saveTokens(tokens)),
          catchError((refreshError: unknown) => {
            store.clear();
            return throwError(() => refreshError);
          }),
          finalize(() => {
            refreshRequest = null;
          }),
          shareReplay({ bufferSize: 1, refCount: false }),
        );
      }

      return refreshRequest.pipe(
        switchMap((tokens) => {
          const retryRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          });

          return next(retryRequest);
        }),
      );
    }),
  );
};
