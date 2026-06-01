import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/interfaces/auth.interface';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { LucideIconComponent } from '../../shared/components/lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    LucideIconComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  userType = signal('cliente');
  email = signal('');
  password = signal('');
  isRegister = signal(false);

  readonly heroImage =
    'https://images.unsplash.com/photo-1654895716780-b4664497420d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwbW9kZXJuJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Nzk1Njk5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080';

  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  toggleRegister(): void {
    this.isRegister.update((v) => !v);
  }

  handleLogin(event: Event): void {
    event.preventDefault();
    const role = this.userType() === 'veterinario' ? UserRole.Veterinario : UserRole.Cliente;
    this.auth.login(this.email(), role);
    if (role === UserRole.Veterinario) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/client']);
    }
  }
}
