import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';

const emergenciesData = [
  { month: 'Ene', emergencias: 12, consultas: 45 },
  { month: 'Feb', emergencias: 18, consultas: 52 },
  { month: 'Mar', emergencias: 15, consultas: 48 },
  { month: 'Abr', emergencias: 22, consultas: 60 },
  { month: 'May', emergencias: 20, consultas: 55 },
];

const speciesData = [
  { name: 'Perros', value: 65, color: '#2563EB' },
  { name: 'Gatos', value: 28, color: '#10B981' },
  { name: 'Otros', value: 7, color: '#F59E0B' },
];

const recentEmergencies = [
  { id: 1, pet: 'Max', owner: 'María López', condition: 'Fractura', priority: 'Alta', time: '10:30 AM' },
  { id: 2, pet: 'Luna', owner: 'Carlos Ruiz', condition: 'Intoxicación', priority: 'Crítica', time: '11:15 AM' },
  { id: 3, pet: 'Rocky', owner: 'Ana García', condition: 'Fiebre alta', priority: 'Media', time: '12:00 PM' },
  { id: 4, pet: 'Milo', owner: 'Pedro Sánchez', condition: 'Vómitos', priority: 'Media', time: '2:30 PM' },
];

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, LucideIconComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef<HTMLCanvasElement>;

  readonly emergenciesData = emergenciesData;
  readonly speciesData = speciesData;
  readonly recentEmergencies = recentEmergencies;

  private lineChart?: Chart;
  private pieChart?: Chart;

  ngAfterViewInit(): void {
    this.initLineChart();
    this.initPieChart();
  }

  ngOnDestroy(): void {
    this.lineChart?.destroy();
    this.pieChart?.destroy();
  }

  getPriorityChipClass(priority: string): string {
    if (priority === 'Crítica') return 'chip--critical';
    if (priority === 'Alta') return 'chip--high';
    return 'chip--medium';
  }

  private initLineChart(): void {
    const ctx = this.lineChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: emergenciesData.map((d) => d.month),
        datasets: [
          {
            label: 'Emergencias',
            data: emergenciesData.map((d) => d.emergencias),
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            borderWidth: 2,
          },
          {
            label: 'Consultas',
            data: emergenciesData.map((d) => d.consultas),
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          x: { grid: { color: '#E2E8F0' }, ticks: { color: '#64748B' } },
          y: { grid: { color: '#E2E8F0' }, ticks: { color: '#64748B' } },
        },
      },
    };
    this.lineChart = new Chart(ctx, config);
  }

  private initPieChart(): void {
    const ctx = this.pieChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: speciesData.map((d) => d.name),
        datasets: [
          {
            data: speciesData.map((d) => d.value),
            backgroundColor: speciesData.map((d) => d.color),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
            },
          },
        },
      },
    };
    this.pieChart = new Chart(ctx, config);
  }
}
