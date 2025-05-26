import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexLegend,
  ChartComponent
} from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controle',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartComponent],
  templateUrl: './controle.component.html',
})
export class ControleComponent {
  // Dados de controle financeiro
  controle = [
    { nome: 'Alimentação', valor: 1200, data: '2025-05-20' },
    { nome: 'Transporte', valor: 600, data: '2025-05-21' },
    { nome: 'Lazer', valor: 400, data: '2025-05-22' },
    { nome: 'Moradia', valor: 1800, data: '2025-05-23' },
    { nome: 'Outros', valor: 350, data: '2025-05-24' },
  ];

  // Formulário
  nome = '';
  valor: number | null = null;
  data = '';

  // Filtros
  filtroNome = '';
  filtroData = '';
  filtroValorMin: number | null = null;
  filtroValorMax: number | null = null;

  // Gráficos
  donutChartOptions: any;
  barChartOptions: any;

  constructor() {
    this.atualizarGraficos();
  }

  get controleFiltrado() {
    return this.controle.filter(item => {
      const nomeFiltra = this.filtroNome ? item.nome.toLowerCase().includes(this.filtroNome.toLowerCase()) : true;
      const dataFiltra = this.filtroData ? item.data === this.filtroData : true;
      const valorMinFiltra = this.filtroValorMin !== null ? item.valor >= this.filtroValorMin : true;
      const valorMaxFiltra = this.filtroValorMax !== null ? item.valor <= this.filtroValorMax : true;
      return nomeFiltra && dataFiltra && valorMinFiltra && valorMaxFiltra;
    });
  }

  adicionarItem() {
    if (this.nome && this.valor !== null && this.data) {
      this.controle.push({ nome: this.nome, valor: this.valor, data: this.data });
      this.nome = '';
      this.valor = null;
      this.data = '';
      this.atualizarGraficos();
    }
  }

  removerItem(index: number) {
    this.controle.splice(index, 1);
    this.atualizarGraficos();
  }

  atualizarGraficos() {
    const dados = this.controleFiltrado;

    this.donutChartOptions = {
      series: dados.map(item => item.valor),
      chart: { type: 'donut' } as ApexChart,
      labels: dados.map(item => item.nome),
      title: { text: 'Distribuição dos Gastos' } as ApexTitleSubtitle,
      legend: { position: 'bottom' } as ApexLegend
    };

    this.barChartOptions = {
      series: [
        { name: 'Gastos', data: dados.map(item => item.valor) }
      ] as ApexAxisChartSeries,
      chart: { type: 'bar', height: 350 } as ApexChart,
      xaxis: { categories: dados.map(item => item.nome) } as ApexXAxis,
      title: { text: 'Gastos por Categoria' } as ApexTitleSubtitle,
      legend: { position: 'bottom' } as ApexLegend
    };
  }
}
