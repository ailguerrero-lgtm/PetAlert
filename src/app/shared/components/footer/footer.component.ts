import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule, LucideIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
