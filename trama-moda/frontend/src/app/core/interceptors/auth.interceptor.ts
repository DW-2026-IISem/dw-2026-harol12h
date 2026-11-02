import {
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Observable,
  catchError,
  finalize,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import { SessionTokens } from '../models/auth.model';
import { SessionApi } from '../services/session-api';
import { SessionStore } from '../services/session-store';

const REFRESH_RETRIED = new HttpContextToken<boolean>(() => false);
let refreshInFlight: Observable<SessionTokens> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(SessionStore);
  const sessionApi = inject(SessionApi);
  const router = inject(Router);

  const isOpenSessionEndpoint =
    /\/sesion\/(login|refresh|logout)(?:[?#]|$)/i.test(req.url);
  if (isOpenSessionEndpoint) {
    return next(
      req.clone({ headers: req.headers.delete('Authorization') }),
    );
  }

  if (!store.authEnabled) {
    return next(req);
  }

  const accessToken = store.accessToken();
  const request = accessToken
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      })
    : req;

  return next(request).pipe(
    catchError((error: unknown) => {
      if (
        !(error instanceof HttpErrorResponse) ||
        error.status !== 401 ||
        req.context.get(REFRESH_RETRIED)
      ) {
        return throwError(() => error);
      }

      const refreshToken = store.refreshToken();
      if (!refreshToken) {
        store.clear();
        redirectToLogin(router);
        return throwError(() => error);
      }

      if (!refreshInFlight) {
        refreshInFlight = sessionApi.refresh({ refreshToken }).pipe(
          tap((tokens) => store.saveTokens(tokens)),
          catchError((refreshError: unknown) => {
            store.clear();
            redirectToLogin(router);
            return throwError(() => refreshError);
          }),
          finalize(() => {
            refreshInFlight = null;
          }),
          shareReplay({ bufferSize: 1, refCount: false }),
        );
      }

      return refreshInFlight.pipe(
        switchMap((tokens) =>
          next(
            req.clone({
              context: req.context.set(REFRESH_RETRIED, true),
              setHeaders: {
                Authorization: `Bearer ${tokens.accessToken}`,
              },
            }),
          ),
        ),
      );
    }),
  );
};

function redirectToLogin(router: Router): void {
  const returnUrl = router.url;
  const safeReturnUrl =
    returnUrl.startsWith('/') && !returnUrl.startsWith('//')
      ? returnUrl
      : undefined;

  void router.navigate(['/login'], {
    queryParams: safeReturnUrl ? { returnUrl: safeReturnUrl } : undefined,
  });
}
