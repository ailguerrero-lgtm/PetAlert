import { Injectable, signal } from '@angular/core';
import { AuthSession, UserRole } from '../interfaces/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionSignal = signal<AuthSession | null>(this.readStoredSession());

  readonly session = this.sessionSignal.asReadonly();

  login(email: string, role: UserRole): void {
    const session: AuthSession = {
      email,
      role,
      displayName: role === UserRole.Veterinario ? 'Dr. Juan Pérez' : 'María López',
      roleLabel: role === UserRole.Veterinario ? 'Veterinario Principal' : 'Cliente',
    };
    sessionStorage.setItem('petalert_session', JSON.stringify(session));
    this.sessionSignal.set(session);
  }

  logout(): void {
    sessionStorage.removeItem('petalert_session');
    this.sessionSignal.set(null);
  }

  isAuthenticated(): boolean {
    return this.sessionSignal() !== null;
  }

  hasRole(role: UserRole): boolean {
    return this.sessionSignal()?.role === role;
  }

  private readStoredSession(): AuthSession | null {
    try {
      const raw = sessionStorage.getItem('petalert_session');
      return raw ? (JSON.parse(raw) as AuthSession) : null;
    } catch {
      return null;
    }
  }
}
