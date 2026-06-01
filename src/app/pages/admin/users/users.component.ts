import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';

const users = [
  { id: 1, name: 'Dr. Juan Pérez', email: 'juan.perez@petalert.com', phone: '+1 234-567-8901', role: 'Veterinario', specialty: 'Cirugía General', status: 'Activo', patients: 45 },
  { id: 2, name: 'Dra. María González', email: 'maria.gonzalez@petalert.com', phone: '+1 234-567-8902', role: 'Veterinario', specialty: 'Medicina Interna', status: 'Activo', patients: 38 },
  { id: 3, name: 'Dr. Luis Martínez', email: 'luis.martinez@petalert.com', phone: '+1 234-567-8903', role: 'Veterinario', specialty: 'Emergencias', status: 'Activo', patients: 52 },
  { id: 4, name: 'Dra. Ana García', email: 'ana.garcia@petalert.com', phone: '+1 234-567-8904', role: 'Veterinario', specialty: 'Dermatología', status: 'Activo', patients: 28 },
  { id: 5, name: 'María López', email: 'maria.lopez@email.com', phone: '+1 234-567-8905', role: 'Cliente', specialty: '-', status: 'Activo', patients: 2 },
  { id: 6, name: 'Carlos Ruiz', email: 'carlos.ruiz@email.com', phone: '+1 234-567-8906', role: 'Cliente', specialty: '-', status: 'Activo', patients: 1 },
  { id: 7, name: 'Ana Rodríguez', email: 'ana.rodriguez@email.com', phone: '+1 234-567-8907', role: 'Cliente', specialty: '-', status: 'Activo', patients: 3 },
  { id: 8, name: 'Pedro Sánchez', email: 'pedro.sanchez@email.com', phone: '+1 234-567-8908', role: 'Cliente', specialty: '-', status: 'Inactivo', patients: 1 },
];

type RoleFilter = 'all' | 'Veterinario' | 'Cliente';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatTableModule,
    LucideIconComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  readonly users = users;
  readonly displayedColumns = ['usuario', 'contacto', 'rol', 'especialidad', 'mascotas', 'estado', 'acciones'];

  searchTerm = signal('');
  filterRole = signal<RoleFilter>('all');

  veterinariosCount = users.filter((u) => u.role === 'Veterinario').length;
  clientesCount = users.filter((u) => u.role === 'Cliente').length;

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const role = this.filterRole();
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
      const matchesRole = role === 'all' || user.role === role;
      return matchesSearch && matchesRole;
    });
  });

  setFilterRole(role: RoleFilter): void {
    this.filterRole.set(role);
  }

  getRoleClass(role: string): string {
    return role === 'Veterinario' ? 'role--vet' : 'role--client';
  }

  getStatusClass(status: string): string {
    return status === 'Activo' ? 'status--active' : 'status--inactive';
  }
}
