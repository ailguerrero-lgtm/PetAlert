import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing-page.component').then((m) => m.LandingPageComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./pages/admin/admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent) },
      { path: 'pets', loadComponent: () => import('./pages/admin/pets/pets.component').then((m) => m.PetsComponent) },
      { path: 'emergencies', loadComponent: () => import('./pages/admin/emergencies/emergencies.component').then((m) => m.EmergenciesComponent) },
      { path: 'medical-history', loadComponent: () => import('./pages/admin/medical-history/medical-history.component').then((m) => m.MedicalHistoryComponent) },
      { path: 'appointments', loadComponent: () => import('./pages/admin/appointments/appointments.component').then((m) => m.AppointmentsComponent) },
      { path: 'reports', loadComponent: () => import('./pages/admin/reports/reports.component').then((m) => m.ReportsComponent) },
      { path: 'users', loadComponent: () => import('./pages/admin/users/users.component').then((m) => m.UsersComponent) },
      { path: 'settings', loadComponent: () => import('./pages/admin/settings/settings.component').then((m) => m.SettingsComponent) },
    ],
  },
  {
    path: 'client',
    loadComponent: () => import('./layouts/client-layout/client-layout.component').then((m) => m.ClientLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./pages/client/client-dashboard/client-dashboard.component').then((m) => m.ClientDashboardComponent) },
      { path: 'register-pet', loadComponent: () => import('./pages/client/register-pet/register-pet.component').then((m) => m.RegisterPetComponent) },
      { path: 'appointments', loadComponent: () => import('./pages/client/client-appointments/client-appointments.component').then((m) => m.ClientAppointmentsComponent) },
      { path: 'medical-history', loadComponent: () => import('./pages/client/client-medical-history/client-medical-history.component').then((m) => m.ClientMedicalHistoryComponent) },
      { path: 'profile', loadComponent: () => import('./pages/client/client-profile/client-profile.component').then((m) => m.ClientProfileComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];