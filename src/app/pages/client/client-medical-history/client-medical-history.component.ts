import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';

const myPets = [
  { id: 1, name: 'Max', species: 'Perro', breed: 'Golden Retriever' },
  { id: 2, name: 'Luna', species: 'Gato', breed: 'Persa' },
];

const medicalHistory: Record<number, {
  consultations: { id: number; date: string; type: string; doctor: string; diagnosis: string; observations: string }[];
  vaccines: { id: number; name: string; date: string; nextDate: string; lot: string }[];
  treatments: { id: number; name: string; startDate: string; duration: string; status: string }[];
  medications: { id: number; name: string; dose: string; frequency: string; date: string }[];
}> = {
  1: {
    consultations: [
      { id: 1, date: '2026-05-15', type: 'Chequeo General', doctor: 'Dr. Juan Pérez', diagnosis: 'Estado de salud óptimo', observations: 'Paciente en excelentes condiciones. Peso adecuado. Sin anomalías detectadas.' },
      { id: 2, date: '2026-04-10', type: 'Control Post-Vacunación', doctor: 'Dra. María González', diagnosis: 'Sin reacciones adversas', observations: 'Evolución favorable después de la vacunación antirrábica.' },
    ],
    vaccines: [
      { id: 1, name: 'Vacuna Antirrábica', date: '2026-04-05', nextDate: '2027-04-05', lot: 'VAC-2026-1234' },
      { id: 2, name: 'Vacuna Séxtuple', date: '2026-01-15', nextDate: '2027-01-15', lot: 'VAC-2026-5678' },
    ],
    treatments: [{ id: 1, name: 'Desparasitación Interna', startDate: '2026-03-20', duration: '1 dosis', status: 'Completado' }],
    medications: [{ id: 1, name: 'Ivermectina', dose: '1 comprimido', frequency: 'Dosis única', date: '2026-03-20' }],
  },
  2: {
    consultations: [
      { id: 1, date: '2026-05-20', type: 'Consulta General', doctor: 'Dr. Luis Martínez', diagnosis: 'Control de rutina', observations: 'Paciente con buen estado general. Se recomienda vacunación próxima.' },
    ],
    vaccines: [{ id: 1, name: 'Vacuna Triple Felina', date: '2026-02-10', nextDate: '2027-02-10', lot: 'VAC-2026-9012' }],
    treatments: [],
    medications: [],
  },
};

@Component({
  selector: 'app-client-medical-history',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatExpansionModule,
    LucideIconComponent,
  ],
  templateUrl: './client-medical-history.component.html',
  styleUrl: './client-medical-history.component.scss',
})
export class ClientMedicalHistoryComponent {
  readonly myPets = myPets;
  selectedPet = signal(0);

  currentPet = computed(() => myPets[this.selectedPet()]);
  currentHistory = computed(() => medicalHistory[this.currentPet().id]);

  handleDownloadPDF(): void {
    console.log(`Descargando historial médico de ${this.currentPet().name}...`);
  }
}
