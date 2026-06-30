import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';
import { PetStoreService } from '../../../core/services/pet-store.service';

const alerts = [
  { id: 1, message: 'Vacuna de Luna próxima a vencer', priority: 'Alta', date: '3 días' },
  { id: 2, message: 'Recordatorio: Desparasitación de Max', priority: 'Media', date: '1 semana' },
];

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatChipsModule, LucideIconComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss',
})
export class ClientDashboardComponent {
  private readonly petStore = inject(PetStoreService);
  private readonly router = inject(Router);

  // Usamos funciones "get" para que el HTML pueda leerlos como arreglos normales sin romper tu @for
  get myPets() {
    return this.petStore.pets();
  }

  get upcomingAppointments() {
    return this.petStore.appointments();
  }

  readonly alerts = alerts;

  goRegisterPet(): void {
    this.router.navigate(['/client/register-pet']);
  }
}