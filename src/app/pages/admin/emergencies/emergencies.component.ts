import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';

const emergencies = [
  { id: 1, pet: 'Luna', owner: 'Carlos Ruiz', species: 'Gato', condition: 'Intoxicación alimentaria', symptoms: ['Vómitos', 'Letargia', 'Deshidratación'], priority: 'Crítica', time: '11:15 AM', status: 'En atención', room: 'Sala 2', doctor: 'Dr. Juan Pérez' },
  { id: 2, pet: 'Max', owner: 'María López', species: 'Perro', condition: 'Fractura en pata trasera', symptoms: ['Dolor agudo', 'Imposibilidad de caminar', 'Inflamación'], priority: 'Alta', time: '10:30 AM', status: 'En espera', room: 'Sala 1', doctor: 'Dra. Ana García' },
  { id: 3, pet: 'Rocky', owner: 'Pedro Sánchez', species: 'Perro', condition: 'Fiebre alta persistente', symptoms: ['Temperatura 40°C', 'Debilidad', 'Falta de apetito'], priority: 'Media', time: '12:00 PM', status: 'Evaluación', room: 'Sala 3', doctor: 'Dr. Luis Martínez' },
  { id: 4, pet: 'Milo', owner: 'Ana Rodríguez', species: 'Perro', condition: 'Vómitos frecuentes', symptoms: ['Vómitos', 'Malestar general'], priority: 'Media', time: '2:30 PM', status: 'En espera', room: '-', doctor: '-' },
];

const recommendations = [
  { priority: 'Crítica', action: 'Atención inmediata - Estabilizar paciente', color: '#EF4444', icon: 'alert-circle' },
  { priority: 'Alta', action: 'Atención urgente - Máximo 15 minutos', color: '#F59E0B', icon: 'clock' },
  { priority: 'Media', action: 'Evaluación necesaria - Máximo 30 minutos', color: '#2563EB', icon: 'activity' },
];

@Component({
  selector: 'app-emergencies',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    LucideIconComponent,
  ],
  templateUrl: './emergencies.component.html',
  styleUrl: './emergencies.component.scss',
})
export class EmergenciesComponent {
  readonly emergencies = emergencies;
  readonly recommendations = recommendations;

  getPriorityClass(priority: string): string {
    if (priority === 'Crítica') return 'priority--critical';
    if (priority === 'Alta') return 'priority--high';
    return 'priority--medium';
  }

  getStatusClass(status: string): string {
    return status === 'En atención' ? 'status--active' : 'status--waiting';
  }
}
