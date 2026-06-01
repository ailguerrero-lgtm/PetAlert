import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../interfaces/auth.interface';

/** Guard opcional: protege rutas si hay sesión; las rutas demo siguen accesibles sin login (como el prototipo React). */
export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'] as UserRole | undefined;

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/']);
  }

  if (expectedRole && !auth.hasRole(expectedRole)) {
    const session = auth.session();
    if (session?.role === UserRole.Veterinario) {
      return router.createUrlTree(['/admin']);
    }
    return router.createUrlTree(['/client']);
  }

  return true;
};
