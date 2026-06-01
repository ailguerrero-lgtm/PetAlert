import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';

const myPets = [
  { id: 1, name: 'Max', species: 'Perro', breed: 'Golden Retriever', age: '3 años', image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBoYXBweXxlbnwxfHx8fDE3Nzk1Njk5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080', status: 'Saludable', nextVaccine: '15 Jun 2026' },
  { id: 2, name: 'Luna', species: 'Gato', breed: 'Persa', age: '2 años', image: 'https://images.unsplash.com/photo-1559624989-7b9303bd9792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcGV0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc5NTY5OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080', status: 'Control Pendiente', nextVaccine: '28 May 2026' },
];

const upcomingAppointments = [
  { id: 1, pet: 'Max', date: '25 May 2026', time: '10:00 AM', type: 'Chequeo General', doctor: 'Dr. Juan Pérez' },
  { id: 2, pet: 'Luna', date: '28 May 2026', time: '3:00 PM', type: 'Vacunación', doctor: 'Dra. María González' },
];

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
  readonly myPets = myPets;
  readonly upcomingAppointments = upcomingAppointments;
  readonly alerts = alerts;

  constructor(private readonly router: Router) {}

  goRegisterPet(): void {
    this.router.navigate(['/client/register-pet']);
  }
}
