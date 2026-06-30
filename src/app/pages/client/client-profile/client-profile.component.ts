import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div style="padding: 40px;">
      <mat-card style="max-width: 500px; padding: 20px; margin: 0 auto;">
        <h1>Mi Perfil</h1>
        <div class="profile-info" style="margin: 20px 0;">
          <p><strong>Nombre:</strong> María López</p>
          <p><strong>Email:</strong> maria.lopez&#64;ejemplo.com</p>
          <p><strong>Teléfono:</strong> +593 99 999 9999</p>
        </div>
        <button mat-flat-button color="primary">Editar Información</button>
      </mat-card>
    </div>
  `
})
export class ClientProfileComponent {}