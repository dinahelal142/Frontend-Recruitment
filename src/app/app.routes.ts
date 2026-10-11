// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { UserRole } from './shared/enums/user-role';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'hr',
    canActivate: [roleGuard],
    data: { role: UserRole.HR },
    loadChildren: () => import('./features/hr/hr-dashboard/hr-dashboard').then(m => m.HrDashboard) // أنشئ ملف مسارات خاص بالـ HR
  },
  {
    path: 'candidate',
    canActivate: [roleGuard],
    data: { role: UserRole.Candidate },
    loadChildren: () => import('./features/candidate/candidate-portal/candidate-portal').then(m => m.CandidatePortal) // أنشئ ملف مسارات خاص بالـ Candidate
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' }
];