import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexLegend, ChartComponent
} from 'ng-apexcharts';

@Component({
  selector: 'app-controle',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './controle.component.html',
})
export class ControleComponent {
  controle = [
    { nome: 'Item 1', valor: 100 },
    { nome: 'Item 2', valor: 200 },
    { nome: 'Item 3', valor: 300 }
  ];

  donutChartOptions = {
    series: [44, 55, 41],
    chart: { type: 'donut' } as ApexChart,
    labels: ['A', 'B', 'C'],
    title: { text: 'Donut Chart' } as ApexTitleSubtitle,
    legend: { position: 'bottom' } as ApexLegend
  };

  barChartOptions = {
    series: [
      { name: 'Series 1', data: [30, 40, 45, 50, 49, 60] }
    ] as ApexAxisChartSeries,
    chart: { type: 'bar', height: 350 } as ApexChart,
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] } as ApexXAxis,
    title: { text: 'Bar Chart' } as ApexTitleSubtitle
  };
}
