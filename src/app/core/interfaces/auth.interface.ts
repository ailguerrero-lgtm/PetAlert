export enum UserRole {
  Veterinario = 'veterinario',
  Cliente = 'cliente',
}

export interface AuthSession {
  email: string;
  role: UserRole;
  displayName: string;
  roleLabel: string;
}
