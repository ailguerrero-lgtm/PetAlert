import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';

const medicalRecords = [
  { id: 1, date: '2026-05-20', type: 'Consulta General', pet: 'Max', doctor: 'Dr. Juan Pérez', diagnosis: 'Chequeo de rutina - Estado de salud óptimo', treatment: 'Ninguno', medications: [] as string[], notes: 'Mascota saludable. Peso adecuado. Recomendaciones de dieta mantenidas.' },
  { id: 2, date: '2026-05-15', type: 'Vacunación', pet: 'Luna', doctor: 'Dra. María González', diagnosis: 'Aplicación de vacuna antirrábica anual', treatment: 'Vacuna antirrábica', medications: ['Vacuna Rabia - 1ml'], notes: 'Próxima vacuna en mayo 2027. Sin reacciones adversas.' },
  { id: 3, date: '2026-05-10', type: 'Emergencia', pet: 'Rocky', doctor: 'Dr. Luis Martínez', diagnosis: 'Fractura en pata trasera derecha', treatment: 'Cirugía de reducción y fijación', medications: ['Tramadol 50mg', 'Antibiótico - Cefalexina 500mg'], notes: 'Cirugía exitosa. Reposo absoluto por 6 semanas. Control en 10 días.' },
  { id: 4, date: '2026-05-05', type: 'Tratamiento', pet: 'Bella', doctor: 'Dra. Ana García', diagnosis: 'Infección en oído izquierdo', treatment: 'Limpieza profunda y medicación tópica', medications: ['Gotas óticas antibióticas', 'Antiinflamatorio oral'], notes: 'Aplicar gotas 2 veces al día por 10 días. Control en 1 semana.' },
  { id: 5, date: '2026-04-28', type: 'Consulta Especializada', pet: 'Milo', doctor: 'Dr. Juan Pérez', diagnosis: 'Problemas dermatológicos - Alergias alimentarias', treatment: 'Cambio de dieta y tratamiento tópico', medications: ['Shampoo medicado', 'Antihistamínico'], notes: 'Dieta hipoalergénica estricta. Eliminar pollo y cereales.' },
];

@Component({
  selector: 'app-medical-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    LucideIconComponent,
  ],
  templateUrl: './medical-history.component.html',
  styleUrl: './medical-history.component.scss',
})
export class MedicalHistoryComponent {
  searchTerm = signal('');

  filteredRecords = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return medicalRecords.filter(
      (r) =>
        r.pet.toLowerCase().includes(term) ||
        r.diagnosis.toLowerCase().includes(term) ||
        r.doctor.toLowerCase().includes(term),
    );
  });

  getTypeConfig(type: string): { bg: string; color: string; icon: string } {
    switch (type) {
      case 'Consulta General': return { bg: '#DBEAFE', color: '#2563EB', icon: 'stethoscope' };
      case 'Vacunación': return { bg: '#D1FAE5', color: '#10B981', icon: 'syringe' };
      case 'Emergencia': return { bg: '#FEE2E2', color: '#EF4444', icon: 'alert-circle' };
      case 'Tratamiento': return { bg: '#FED7AA', color: '#F59E0B', icon: 'pill' };
      case 'Consulta Especializada': return { bg: '#E9D5FF', color: '#A855F7', icon: 'file-text' };
      default: return { bg: '#E2E8F0', color: '#64748B', icon: 'file-text' };
    }
  }
}
