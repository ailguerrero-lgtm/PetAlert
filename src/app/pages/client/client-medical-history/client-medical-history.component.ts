import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';
import { PetStoreService } from '../../../core/services/pet-store.service';

const medicalHistory: Record<string, {
  consultations: { id: number; date: string; type: string; doctor: string; diagnosis: string; observations: string }[];
  vaccines: { id: number; name: string; date: string; nextDate: string; lot: string }[];
  treatments: { id: number; name: string; startDate: string; duration: string; status: string }[];
  medications: { id: number; name: string; dose: string; frequency: string; date: string }[];
}> = {
  '1': {
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
  '2': {
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
  private readonly petStore = inject(PetStoreService);

  get myPets() {
    return this.petStore.pets();
  }

  selectedPet = signal(0);

  currentPet = computed(() => this.myPets[this.selectedPet()]);

  currentHistory = computed(() => {
    const pet = this.currentPet();
    if (!pet) return { consultations: [], vaccines: [], treatments: [], medications: [] };
    return medicalHistory[pet.id] || { consultations: [], vaccines: [], treatments: [], medications: [] };
  });

  handleDownloadPDF(): void {
    const pet = this.currentPet();
    const history = this.currentHistory();
    if (!pet) return;

    let consultationsHtml = '';
    if (history.consultations && history.consultations.length > 0) {
      history.consultations.forEach(c => {
        consultationsHtml += `
          <div class="card-item">
            <div class="card-item-header">
              <span class="badge badge-blue">${c.type}</span>
              <span class="date-text">📅 ${c.date} | 🩺 ${c.doctor}</span>
            </div>
            <p><strong>Diagnóstico:</strong> ${c.diagnosis}</p>
            <p style="margin-bottom:0; color:#475569;"><strong>Observaciones:</strong> ${c.observations}</p>
          </div>`;
      });
    } else {
      consultationsHtml = '<p class="empty-text">No se registran consultas médicas.</p>';
    }

    let vaccinesHtml = '';
    if (history.vaccines && history.vaccines.length > 0) {
      history.vaccines.forEach(v => {
        vaccinesHtml += `
          <tr>
            <td><strong>${v.name}</strong></td>
            <td>${v.date}</td>
            <td style="color:#16a34a; font-weight:bold;">${v.nextDate}</td>
            <td><code>${v.lot}</code></td>
          </tr>`;
      });
    } else {
      vaccinesHtml = '<tr><td colspan="4" class="empty-text" style="text-align:center;">No hay vacunas registradas.</td></tr>';
    }

    let treatmentsHtml = '';
    if (history.treatments && history.treatments.length > 0) {
      history.treatments.forEach(t => {
        treatmentsHtml += `
          <div class="card-item">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong>🛠️ ${t.name}</strong>
              <span class="badge badge-green">${t.status}</span>
            </div>
            <p style="margin:6px 0 0 0; font-size:13px; color:#64748b;">Inicio: ${t.startDate} | Duración: ${t.duration}</p>
          </div>`;
      });
    } else {
      treatmentsHtml = '<p class="empty-text">No se registran tratamientos.</p>';
    }

    let medicationsHtml = '';
    if (history.medications && history.medications.length > 0) {
      history.medications.forEach(m => {
        medicationsHtml += `
          <div class="card-item">
            <strong>💊 ${m.name}</strong>
            <p style="margin:4px 0 0 0; font-size:13px; color:#64748b;">Dosis: ${m.dose} • Frecuencia: ${m.frequency} • Fecha: ${m.date}</p>
          </div>`;
      });
    } else {
      medicationsHtml = '<p class="empty-text">No se registran medicamentos.</p>';
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Historial_${pet.name}_PetAlert</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; padding: 20px; line-height: 1.5; background: #fff; }
          .container { width: 100%; max-width: 750px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 20px; }
          .logo { font-size: 24px; font-weight: bold; color: #2563eb; }
          .doc-title { text-align: right; }
          .doc-title h1 { margin: 0; font-size: 20px; color: #0f172a; }
          .pet-banner { background: #f1f5f9; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2563eb; }
          .pet-banner h3 { margin: 0 0 5px 0; color: #1e3a8a; }
          .pet-grid { display: flex; gap: 30px; font-size: 14px; }
          h2 { color: #0f172a; font-size: 16px; margin-top: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
          .card-item { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; margin-bottom: 10px; font-size: 14px; }
          .card-item-header { display: flex; justify-content: space-between; margin-bottom: 5px; }
          .badge { padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; }
          .badge-blue { background: #dbeafe; color: #1e40af; }
          .badge-green { background: #d1fae5; color: #065f46; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { padding: 10px; text-align: left; font-size: 13px; border-bottom: 1px solid #e2e8f0; }
          th { background: #f8fafc; color: #475569; }
          .empty-text { color: #94a3b8; font-style: italic; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🐾 PetAlert</div>
            <div class="doc-title">
              <h1>Historial Clínico Oficial</h1>
              <p style="margin:0; font-size:11px; color:#64748b;">Emisión: ${new Date().toLocaleDateString('es-ES')}</p>
            </div>
          </div>
          <div class="pet-banner">
            <h3>Paciente: ${pet.name}</h3>
            <div class="pet-grid">
              <div><strong>Especie:</strong> ${pet.species}</div>
              <div><strong>Raza:</strong> ${pet.breed}</div>
            </div>
          </div>
          <h2>📋 1. Consultas Médicas</h2>
          ${consultationsHtml}
          <h2>💉 2. Esquema de Vacunación</h2>
          <table>
            <thead>
              <tr><th>Vacuna</th><th>Aplicación</th><th>Próxima Dosis</th><th>Lote</th></tr>
            </thead>
            <tbody>${vaccinesHtml}</tbody>
          </table>
          <h2>🛠️ 3. Tratamientos Clínicos</h2>
          ${treatmentsHtml}
          <h2>💊 4. Medicamentos Recetados</h2>
          ${medicationsHtml}
        </div>
      </body>
      </html>
    `;

    // Truco del iframe invisible para forzar el renderizado perfecto sin romper la pestaña de Angular
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();

      // Forzamos al sistema operativo a imprimir el canvas renderizado limpio como archivo
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        document.body.removeChild(iframe);
      }, 500);
    }
  }
}