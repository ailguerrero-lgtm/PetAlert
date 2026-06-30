import { Component, computed, inject, signal } from '@angular/core';
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
import { PetStoreService } from '../../../core/services/pet-store.service';

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
  private readonly petStore = inject(PetStoreService);

  // Leemos dinámicamente desde el servicio global
  get myPets() {
    return this.petStore.pets();
  }

  get myAppointments() {
    return this.petStore.appointments();
  }

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

  // Calculamos las confirmadas dinámicamente basándonos en el servicio
  confirmedCount = computed(
    () => this.petStore.appointments().filter((a) => a.status === 'Confirmada').length,
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
    const data = this.formData();

    if (!data.petId || !data.date || !data.time || !data.reason) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    // Guardamos la cita en el almacén global
    this.petStore.addAppointment({
      pet: data.petName,
      type: data.reason,
      date: data.date,
      time: data.time,
      doctor: 'Dr. Juan Pérez'
    });

    alert(`¡Cita para ${data.petName} agendada correctamente!`);
    this.handleCloseModal();
  }

  updateFormField(field: keyof ClientAppointmentForm, value: string): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  handlePetChange(petId: string): void {
    const pet = this.myPets.find((p) => p.id.toString() === petId.toString());
    this.formData.update((prev) => ({ ...prev, petId, petName: pet?.name ?? '' }));
  }

  getStatusStyle(status: string): { bg: string; color: string; icon: string } {
    if (status === 'Completada') {
      return { bg: '#D1FAE5', color: '#10B981', icon: 'check-circle' };
    }
    return { bg: '#DBEAFE', color: '#2563EB', icon: 'clock' };
  }
}