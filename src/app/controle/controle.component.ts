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
  // Dados
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

  // Edição
  editIndex: number | null = null;

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

  // 🔍 Filtragem dinâmica
  get controleFiltrado() {
    return this.controle.filter(item => {
      const nomeFiltra = this.filtroNome ? item.nome.toLowerCase().includes(this.filtroNome.toLowerCase()) : true;
      const dataFiltra = this.filtroData ? item.data === this.filtroData : true;
      const valorMinFiltra = this.filtroValorMin !== null ? item.valor >= this.filtroValorMin : true;
      const valorMaxFiltra = this.filtroValorMax !== null ? item.valor <= this.filtroValorMax : true;
      return nomeFiltra && dataFiltra && valorMinFiltra && valorMaxFiltra;
    });
  }

  // ➕ Adicionar ou Editar
  adicionarOuEditarItem() {
    if (this.nome && this.valor !== null && this.data) {
      if (this.editIndex !== null) {
        // Edição
        this.controle[this.editIndex] = {
          nome: this.nome,
          valor: this.valor,
          data: this.data
        };
        this.editIndex = null;
      } else {
        // Adicionar
        this.controle.push({
          nome: this.nome,
          valor: this.valor,
          data: this.data
        });
      }

      this.limparFormulario();
      this.atualizarGraficos();
    }
  }

  // ✏️ Iniciar Edição
  editarItem(index: number) {
    const item = this.controle[index];
    this.nome = item.nome;
    this.valor = item.valor;
    this.data = item.data;
    this.editIndex = index;
  }

  // ❌ Remover
  removerItem(index: number) {
    this.controle.splice(index, 1);
    if (this.editIndex === index) {
      this.limparFormulario();
    }
    this.atualizarGraficos();
  }

  // 🔄 Resetar formulário
  limparFormulario() {
    this.nome = '';
    this.valor = null;
    this.data = '';
    this.editIndex = null;
  }

  // 📊 Atualizar Gráficos
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
