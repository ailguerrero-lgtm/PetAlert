import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-interactive-calendar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, LucideIconComponent],
  templateUrl: './interactive-calendar.component.html',
  styleUrl: './interactive-calendar.component.scss',
})
export class InteractiveCalendarComponent {
  @Input() availability: Record<string, number> = {};
  @Input() selectedDate?: string;
  @Output() dateClick = new EventEmitter<string>();

  currentMonth = signal(new Date());

  readonly monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];
  readonly dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  getDaysInMonth(): (number | null)[] {
    const date = this.currentMonth();
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days: (number | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  }

  getDateString(day: number): string {
    const date = this.currentMonth();
    return new Date(date.getFullYear(), date.getMonth(), day).toISOString().split('T')[0];
  }

  handlePrevMonth(): void {
    const d = this.currentMonth();
    this.currentMonth.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  handleNextMonth(): void {
    const d = this.currentMonth();
    this.currentMonth.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  handleDayClick(day: number | null): void {
    if (!day) return;
    const dateStr = this.getDateString(day);
    const slots = this.availability[dateStr];
    if (slots && slots > 0) this.dateClick.emit(dateStr);
  }

  getDayClass(day: number | null): string {
    if (!day) return 'day day--empty';
    const dateStr = this.getDateString(day);
    const slots = this.availability[dateStr];
    const available = slots && slots > 0;
    const selected = this.selectedDate === dateStr;
    const isToday = this.today === dateStr;
    let cls = 'day';
    if (available) cls += ' day--available';
    else if (slots === 0) cls += ' day--full';
    else cls += ' day--disabled';
    if (selected) cls += ' day--selected';
    if (isToday) cls += ' day--today';
    return cls;
  }
}
