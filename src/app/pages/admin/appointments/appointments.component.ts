import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { InteractiveCalendarComponent } from '../../../shared/components/interactive-calendar/interactive-calendar.component';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';

const appointments = [
  { id: 1, pet: 'Max', owner: 'María López', date: '2026-05-25', time: '10:00 AM', type: 'Chequeo General', doctor: 'Dr. Juan Pérez', status: 'Pendiente' },
  { id: 2, pet: 'Luna', owner: 'Carlos Ruiz', date: '2026-05-25', time: '11:30 AM', type: 'Vacunación', doctor: 'Dra. María González', status: 'Pendiente' },
  { id: 3, pet: 'Rocky', owner: 'Ana García', date: '2026-05-25', time: '2:00 PM', type: 'Control Post-operatorio', doctor: 'Dr. Luis Martínez', status: 'Completada' },
  { id: 4, pet: 'Bella', owner: 'Pedro Sánchez', date: '2026-05-25', time: '3:30 PM', type: 'Limpieza Dental', doctor: 'Dra. Ana García', status: 'Cancelada' },
  { id: 5, pet: 'Milo', owner: 'Laura Fernández', date: '2026-05-26', time: '9:00 AM', type: 'Primera Consulta', doctor: 'Dr. Juan Pérez', status: 'Pendiente' },
  { id: 6, pet: 'Simba', owner: 'Jorge Ramírez', date: '2026-05-23', time: '4:00 PM', type: 'Emergencia', doctor: 'Dra. María González', status: 'Emergencia' },
];

const calendarAvailability: Record<string, number> = {
  '2026-05-25': 2, '2026-05-26': 5, '2026-05-27': 0, '2026-05-28': 3,
  '2026-05-29': 4, '2026-05-30': 1, '2026-05-31': 0, '2026-06-01': 6, '2026-06-02': 2,
};

interface AppointmentForm {
  petName: string;
  owner: string;
  date: string;
  time: string;
  doctor: string;
  reason: string;
  status: string;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    InteractiveCalendarComponent,
    LucideIconComponent,
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent {
  readonly appointments = appointments;
  readonly calendarAvailability = calendarAvailability;

  selectedTab = signal(0);
  openModal = signal(false);
  selectedDateForAppointment = signal('');

  formData = signal<AppointmentForm>({
    petName: '',
    owner: '',
    date: '',
    time: '',
    doctor: '',
    reason: '',
    status: 'Pendiente',
  });

  filteredAppointments = computed(() => {
    const tab = this.selectedTab();
    switch (tab) {
      case 1: return appointments.filter((a) => a.status === 'Pendiente');
      case 2: return appointments.filter((a) => a.status === 'Completada');
      case 3: return appointments.filter((a) => a.status === 'Cancelada');
      default: return appointments;
    }
  });

  todayAppointmentsCount = computed(
    () => appointments.filter((a) => a.date === '2026-05-25').length,
  );

  handleDateClick(dateStr: string): void {
    this.selectedDateForAppointment.set(dateStr);
    this.formData.update((prev) => ({ ...prev, date: dateStr }));
    this.openModal.set(true);
  }

  handleCloseModal(): void {
    this.openModal.set(false);
    this.formData.set({
      petName: '',
      owner: '',
      date: '',
      time: '',
      doctor: '',
      reason: '',
      status: 'Pendiente',
    });
  }

  handleSaveAppointment(): void {
    console.log('Guardando cita:', this.formData());
    this.handleCloseModal();
  }

  updateFormField(field: keyof AppointmentForm, value: string): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  getStatusConfig(status: string): { bg: string; color: string; icon: string } {
    switch (status) {
      case 'Pendiente': return { bg: '#DBEAFE', color: '#2563EB', icon: 'clock' };
      case 'Completada': return { bg: '#D1FAE5', color: '#10B981', icon: 'check-circle' };
      case 'Cancelada': return { bg: '#FEE2E2', color: '#EF4444', icon: 'x-circle' };
      case 'Emergencia': return { bg: '#FED7AA', color: '#F59E0B', icon: 'alert-circle' };
      default: return { bg: '#E2E8F0', color: '#64748B', icon: 'clock' };
    }
  }
}
