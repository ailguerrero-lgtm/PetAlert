import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';

interface PetForm {
  name: string;
  species: string;
  breed: string;
  age: string;
  sex: string;
  weight: string;
  vaccines: string;
  allergies: string;
}

@Component({
  selector: 'app-register-pet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    LucideIconComponent,
  ],
  templateUrl: './register-pet.component.html',
  styleUrl: './register-pet.component.scss',
})
export class RegisterPetComponent {
  formData = signal<PetForm>({
    name: '',
    species: '',
    breed: '',
    age: '',
    sex: '',
    weight: '',
    vaccines: '',
    allergies: '',
  });

  constructor(private readonly router: Router) {}

  handleChange(field: keyof PetForm, value: string): void {
    this.formData.update((prev) => ({ ...prev, [field]: value }));
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/client']);
  }

  goBack(): void {
    this.router.navigate(['/client']);
  }
}
