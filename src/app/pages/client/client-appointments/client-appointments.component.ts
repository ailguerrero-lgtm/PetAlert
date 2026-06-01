import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InteractiveCalendarComponent } from '../../../shared/components/interactive-calendar/interactive-calendar.component';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';

const myPets = [{ id: 1, name: 'Max' }, { id: 2, name: 'Luna' }];

const myAppointments = [
  { id: 1, pet: 'Max', date: '2026-05-25', time: '10:00 AM', type: 'Chequeo General', doctor: 'Dr. Juan Pérez', status: 'Confirmada' },
  { id: 2, pet: 'Luna', date: '2026-05-28', time: '3:00 PM', type: 'Vacunación', doctor: 'Dra. María González', status: 'Confirmada' },
  { id: 3, pet: 'Max', date: '2026-05-22', time: '11:00 AM', type: 'Control de Peso', doctor: 'Dr. Luis Martínez', status: 'Completada' },
];

const calendarAvailability: Record<string, number> = {
  '2026-05-25': 2, '2026-05-26': 5, '2026-05-27': 0, '2026-05-28': 3,
  '2026-05-29': 4, '2026-05-30': 1, '2026-05-31': 0, '2026-06-01': 6, '2026-06-02': 2,
};

interface ClientAppointmentForm {
  petId: string;
  petName: string;
  date: string;
  time: string;
  reason: string;
}

@Component({
  selector: 'app-client-appointments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    InteractiveCalendarComponent,
    LucideIconComponent,
  ],
  templateUrl: './client-appointments.component.html',
  styleUrl: './client-appointments.component.scss',
})
export class ClientAppointmentsComponent {
  readonly myPets = myPets;
  readonly myAppointments = myAppointments;
  readonly calendarAvailability = calendarAvailability;

  openModal = signal(false);
  selectedDateForAppointment = signal('');

  formData = signal<ClientAppointmentForm>({
    petId: '',
    petName: '',
    date: '',
    time: '',
    reason: '',
  });

  confirmedCount = computed(
    () => myAppointments.filter((a) => a.status === 'Confirmada').length,
  );

  handleDateClick(dateStr: string): void {
    this.selectedDateForAppointment.set(dateStr);
    this.formData.update((prev) => ({ ...prev, date: dateStr }));
    this.openModal.set(true);
  }

  handleCloseModal(): void {
    this.openModal.set(false);
    this.formData.set({ petId: '', petName: '', date: '', time: '', reason: '' });
  }

  handleSaveAppointment(): void {
    console.log('Guardando cita:', this.formData());
    this.handleCloseModal();
  }

  updateFormField(field: keyof ClientAppointmentForm, value: string): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  handlePetChange(petId: string): void {
    const pet = myPets.find((p) => p.id.toString() === petId);
    this.formData.update((prev) => ({ ...prev, petId, petName: pet?.name ?? '' }));
  }

  getStatusStyle(status: string): { bg: string; color: string; icon: string } {
    if (status === 'Completada') {
      return { bg: '#D1FAE5', color: '#10B981', icon: 'check-circle' };
    }
    return { bg: '#DBEAFE', color: '#2563EB', icon: 'clock' };
  }
}
