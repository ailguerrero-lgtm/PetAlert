import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    FormsModule, // Agregado
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    LucideIconComponent,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  @Input() userName = 'Dr. Juan Pérez';
  @Input() userRole = 'Veterinario';
  
  // Variable para el buscador
  searchQuery: string = '';

  // Evento para enviar el texto de búsqueda al padre
  @Output() search = new EventEmitter<string>();

  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  get initial(): string {
    return this.userName.charAt(0);
  }

  // Se ejecuta cada vez que el usuario escribe
  onSearchChange(): void {
    this.search.emit(this.searchQuery);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}