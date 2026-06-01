import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { LucideIconComponent } from '../../../shared/components/lucide-icon/lucide-icon.component';

const monthlyData = [
  { month: 'Ene', consultas: 120, emergencias: 25, vacunas: 45, cirugias: 8, ingresos: 15000 },
  { month: 'Feb', consultas: 135, emergencias: 30, vacunas: 52, cirugias: 12, ingresos: 18500 },
  { month: 'Mar', consultas: 145, emergencias: 28, vacunas: 48, cirugias: 10, ingresos: 17200 },
  { month: 'Abr', consultas: 160, emergencias: 35, vacunas: 60, cirugias: 15, ingresos: 21000 },
  { month: 'May', consultas: 155, emergencias: 32, vacunas: 55, cirugias: 13, ingresos: 19800 },
];

const speciesDistribution = [
  { name: 'Perros', value: 210, color: '#2563EB' },
  { name: 'Gatos', value: 145, color: '#10B981' },
  { name: 'Aves', value: 35, color: '#F59E0B' },
  { name: 'Conejos', value: 22, color: '#A855F7' },
  { name: 'Otros', value: 18, color: '#64748B' },
];

const topTreatments = [
  { name: 'Vacunación', count: 260, percentage: 35 },
  { name: 'Consulta General', count: 195, percentage: 26 },
  { name: 'Emergencias', count: 150, percentage: 20 },
  { name: 'Cirugías', count: 58, percentage: 8 },
  { name: 'Tratamientos', count: 82, percentage: 11 },
];

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    LucideIconComponent,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef<HTMLCanvasElement>;

  readonly monthlyData = monthlyData;
  readonly speciesDistribution = speciesDistribution;
  readonly topTreatments = topTreatments;
  period = 'mes';

  private barChart?: Chart;
  private pieChart?: Chart;
  private lineChart?: Chart;

  ngAfterViewInit(): void {
    this.initBarChart();
    this.initPieChart();
    this.initLineChart();
  }

  ngOnDestroy(): void {
    this.barChart?.destroy();
    this.pieChart?.destroy();
    this.lineChart?.destroy();
  }

  private initBarChart(): void {
    const ctx = this.barChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: monthlyData.map((d) => d.month),
        datasets: [
          { label: 'Consultas', data: monthlyData.map((d) => d.consultas), backgroundColor: '#2563EB' },
          { label: 'Emergencias', data: monthlyData.map((d) => d.emergencias), backgroundColor: '#EF4444' },
          { label: 'Vacunas', data: monthlyData.map((d) => d.vacunas), backgroundColor: '#10B981' },
          { label: 'Cirugías', data: monthlyData.map((d) => d.cirugias), backgroundColor: '#F59E0B' },
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
    this.barChart = new Chart(ctx, config);
  }

  private initPieChart(): void {
    const ctx = this.pieChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels: speciesDistribution.map((d) => d.name),
        datasets: [{ data: speciesDistribution.map((d) => d.value), backgroundColor: speciesDistribution.map((d) => d.color) }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
      },
    };
    this.pieChart = new Chart(ctx, config);
  }

  private initLineChart(): void {
    const ctx = this.lineChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: monthlyData.map((d) => d.month),
        datasets: [{
          label: 'Ingresos ($)',
          data: monthlyData.map((d) => d.ingresos),
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          pointRadius: 6,
        }],
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
}
