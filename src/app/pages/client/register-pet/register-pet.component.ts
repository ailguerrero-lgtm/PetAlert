import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';
import { PetStoreService } from '../../../core/services/pet-store.service';

@Component({
  selector: 'app-register-pet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    LucideIconComponent,
  ],
  templateUrl: './register-pet.component.html',
  styleUrl: './register-pet.component.scss',
})
export class RegisterPetComponent {
  private readonly petStore = inject(PetStoreService);
  private readonly router = inject(Router);

  // Se añadió el campo 'owner' para cumplir con la interfaz del servicio
  readonly formData = signal({
    name: '',
    species: '',
    breed: '',
    age: '',
    sex: '',
    weight: '',
    owner: '',      // <--- Agregado
    vaccines: '',
    allergies: '',
  });

  handleChange(field: string, value: any): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    const data = this.formData();
    
    // Validación mínima incluyendo 'owner'
    if (!data.name || !data.species || !data.breed || !data.owner) {
      alert('Por favor, completa los campos obligatorios (incluyendo nombre del dueño)');
      return;
    }

    try {
      // Ahora el objeto 'data' tiene 'owner' y el servicio no dará error
      await this.petStore.addPet({ ...data });
      alert('¡Mascota registrada con éxito!');
      
      this.router.navigateByUrl('/client/dashboard');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un error al guardar la mascota');
    }
  }

  goBack(): void {
    this.router.navigate(['/client/dashboard']);
  }
}