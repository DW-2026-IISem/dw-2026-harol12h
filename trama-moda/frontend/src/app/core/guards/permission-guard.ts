import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { SessionStore } from '../services/session-store';

export const permissionGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionStore);
  const router = inject(Router);

  if (!session.authEnabled) {
    return true;
  }

  if (!session.isAuthenticated()) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }

  const configured = route.data['permission'];
  const requirements =
    typeof configured === 'string'
      ? [configured]
      : Array.isArray(configured)
        ? configured.filter(
            (permission): permission is string =>
              typeof permission === 'string',
          )
        : [];
  const missing = requirements.filter((requirement) => {
    const separator = requirement.indexOf(' ');
    if (separator <= 0) {
      return true;
    }

    return !session.canPermission(
      requirement.slice(0, separator),
      requirement.slice(separator + 1).trim(),
    );
  });

  if (requirements.length > 0 && missing.length === 0) {
    return true;
  }

  return router.createUrlTree(['/forbidden'], {
    queryParams: {
      permission:
        missing.length > 0 ? missing.join(', ') : 'Sin permiso configurado',
    },
  });
};
