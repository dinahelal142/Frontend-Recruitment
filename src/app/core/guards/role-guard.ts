// src/app/core/guards/role.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { UserRole } from '../../shared/enums/user-role';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/login']);
    return false;
  }

  const expectedRole = route.data['role'] as UserRole;
  

  const userRole = UserRole.HR; 

  if (userRole === expectedRole) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};