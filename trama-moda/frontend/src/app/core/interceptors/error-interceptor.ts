import {
  HttpContextToken,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { NotificationService } from '../services/notification';
import { toApiMessage } from '../utils/api-error';

/** Opt-in toast for requests without a component-level error presentation. */
export const NOTIFY_HTTP_ERROR = new HttpContextToken<boolean>(() => false);

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        req.context.get(NOTIFY_HTTP_ERROR) &&
        error.status !== 401
      ) {
        const summary =
          error.status === 0
            ? 'Error de conexión'
            : error.status === 403
              ? 'Acceso denegado'
              : error.status === 404
                ? 'Recurso no encontrado'
                : error.status >= 500
                  ? 'Error del servidor'
                  : 'No se pudo completar la solicitud';
        notifications.error(summary, toApiMessage(error));
      }

      return throwError(() => error);
    }),
  );
};
