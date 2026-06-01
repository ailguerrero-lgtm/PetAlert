import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';

const pets = [
  { id: 1, name: 'Max', species: 'Perro', breed: 'Golden Retriever', age: '3 años', owner: 'María López', status: 'Saludable', lastVisit: '2026-05-20', nextVaccine: '2026-06-15', image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBoYXBweXxlbnwxfHx8fDE3Nzk1Njk5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 2, name: 'Luna', species: 'Gato', breed: 'Persa', age: '2 años', owner: 'Carlos Ruiz', status: 'En Tratamiento', lastVisit: '2026-05-22', nextVaccine: '2026-05-28', image: 'https://images.unsplash.com/photo-1559624989-7b9303bd9792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcGV0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc5NTY5OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 3, name: 'Rocky', species: 'Perro', breed: 'Bulldog', age: '5 años', owner: 'Ana García', status: 'Recuperación', lastVisit: '2026-05-10', nextVaccine: '2026-07-01', image: 'https://images.unsplash.com/photo-1630438994394-3deff7a591bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHZldGVyaW5hcmlhbnxlbnwxfHx8fDE3Nzk0MDI5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 4, name: 'Bella', species: 'Perro', breed: 'Pastor Alemán', age: '4 años', owner: 'Pedro Sánchez', status: 'Saludable', lastVisit: '2026-05-18', nextVaccine: '2026-08-15', image: 'https://images.unsplash.com/photo-1630438994394-3deff7a591bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHZldGVyaW5hcmlhbnxlbnwxfHx8fDE3Nzk0MDI5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 5, name: 'Milo', species: 'Gato', breed: 'Siamés', age: '1 año', owner: 'Laura Fernández', status: 'Saludable', lastVisit: '2026-05-15', nextVaccine: '2026-06-20', image: 'https://images.unsplash.com/photo-1559624989-7b9303bd9792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcGV0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc5NTY5OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 6, name: 'Simba', species: 'Gato', breed: 'Maine Coon', age: '3 años', owner: 'Jorge Ramírez', status: 'Control Pendiente', lastVisit: '2026-04-28', nextVaccine: '2026-05-30', image: 'https://images.unsplash.com/photo-1559624989-7b9303bd9792?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcGV0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc5NTY5OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
];

@Component({
  selector: 'app-pets',
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
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss',
})
export class PetsComponent {
  readonly pets = pets;
  searchTerm = signal('');

  filteredPets = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return pets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(term) ||
        pet.owner.toLowerCase().includes(term) ||
        pet.breed.toLowerCase().includes(term),
    );
  });

  healthyCount = computed(() => pets.filter((p) => p.status === 'Saludable').length);
  treatmentCount = computed(() => pets.filter((p) => p.status === 'En Tratamiento').length);
  recoveryCount = computed(() => pets.filter((p) => p.status === 'Recuperación').length);

  getStatusClass(status: string): string {
    switch (status) {
      case 'Saludable': return 'status--healthy';
      case 'En Tratamiento': return 'status--treatment';
      case 'Recuperación': return 'status--recovery';
      case 'Control Pendiente': return 'status--pending';
      default: return 'status--default';
    }
  }
}
