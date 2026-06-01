import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

interface MenuItem {
  text: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, LucideIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() isAdmin = true;

  private readonly router = inject(Router);

  readonly adminMenuItems: MenuItem[] = [
    { text: 'Inicio', icon: 'home', path: '/admin' },
    { text: 'Mascotas', icon: 'heart', path: '/admin/pets' },
    { text: 'Emergencias', icon: 'alert-circle', path: '/admin/emergencies' },
    { text: 'Historial Médico', icon: 'file-text', path: '/admin/medical-history' },
    { text: 'Citas', icon: 'calendar', path: '/admin/appointments' },
    { text: 'Reportes', icon: 'bar-chart-3', path: '/admin/reports' },
    { text: 'Usuarios', icon: 'users', path: '/admin/users' },
    { text: 'Configuración', icon: 'settings', path: '/admin/settings' },
  ];

  readonly clientMenuItems: MenuItem[] = [
    { text: 'Inicio', icon: 'home', path: '/client' },
    { text: 'Mis Mascotas', icon: 'heart', path: '/client' },
    { text: 'Citas', icon: 'calendar', path: '/client/appointments' },
    { text: 'Historial Médico', icon: 'file-text', path: '/client/medical-history' },
    { text: 'Alertas', icon: 'bell', path: '/client' },
  ];

  get menuItems(): MenuItem[] {
    return this.isAdmin ? this.adminMenuItems : this.clientMenuItems;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
