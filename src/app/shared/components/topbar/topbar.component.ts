import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
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

  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  get initial(): string {
    return this.userName.charAt(0);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
