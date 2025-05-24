import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-controle',
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './controle.component.html',
  styleUrl: './controle.component.css'
})
export class ControleComponent {


  descricao = '';
  valor: number | null = null;
  categoria = '';
  data = '';

  gastos = [
    {descricao: 'Supermercado', valor: 250, categoria: 'Alimentação', data: '2025-05-10'},
    {descricao: 'Uber', valor: 45, categoria: 'Transporte', data: '2025-05-11'},
    {descricao: 'Cinema', valor: 30, categoria: 'Lazer', data: '2025-05-12'},
    {descricao: 'Farmácia', valor: 90, categoria: 'Saúde', data: '2025-05-13'},
  ];

  graficoDados: any[] = [];

  colorScheme = {
    domain: ['#00ACC1', '#F4B400', '#FF7043', '#8D6E63', '#81C784', '#9575CD']
  };

  constructor() {
    this.atualizarGrafico();
  }

  addGasto() {
    if (this.descricao && this.valor !== null && this.categoria && this.data) {
      this.gastos.push({
        descricao: this.descricao,
        valor: this.valor,
        categoria: this.categoria,
        data: this.data
      });

      this.descricao = '';
      this.valor = null;
      this.categoria = '';
      this.data = '';

      this.atualizarGrafico();
    }
  }

  atualizarGrafico() {
    const resumo: { [key: string]: number } = {};

    this.gastos.forEach(gasto => {
      if (resumo[gasto.categoria]) {
        resumo[gasto.categoria] += gasto.valor;
      } else {
        resumo[gasto.categoria] = gasto.valor;
      }
    });

    this.graficoDados = Object.keys(resumo).map(categoria => ({
      name: categoria,
      value: resumo[categoria]
    }));
  }

}
