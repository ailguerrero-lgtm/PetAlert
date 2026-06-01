import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  emergencias: boolean;
  citas: boolean;
  reportes: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    LucideIconComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  notifications = signal<NotificationSettings>({
    email: true,
    sms: false,
    emergencias: true,
    citas: true,
    reportes: false,
  });

  updateNotification(key: keyof NotificationSettings, value: boolean): void {
    this.notifications.update((prev) => ({ ...prev, [key]: value }));
  }
}
