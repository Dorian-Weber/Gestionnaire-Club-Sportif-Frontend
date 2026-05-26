import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const superAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);

  if (authService.jwtInfo()?.role != 'SUPER_ADMIN') {

    authService.redirectUrl = state.url;

    const router = inject(Router);
    return router.parseUrl('/login');
  }
  return true;
};
