import { Component, inject, OnInit } from '@angular/core';
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
import { SpentService } from '../../service/spent.service';
import { Spent } from '../../interface/spent';
import { DialogService } from '../../service/dialog.service';
import { ToastService } from '../../service/toast.service';
import { ModalUpdateSpentComponent } from '../../components/modal-update-spent/modal-update-spent.component';
import { ModalUpdateSpentService } from '../../service/modal-update-spent.service';
import { SpentType } from '../../interface/spentType';

@Component({
  selector: 'app-controle',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartComponent],
  templateUrl: './controle.component.html',
})
export class ControleComponent implements OnInit{
  private spentService = inject(SpentService);
  private dialogService = inject(DialogService);
  private toast = inject(ToastService)
  private updateSpentModal = inject(ModalUpdateSpentService)


  //Definindo um array vazio  
  spents:Spent[]|undefined = [] ;
   // Dados
  
   controle =  [
    { nome: 'Alimentação', valor: 1200, data: '2025-05-20'  },
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
  ngOnInit(): void {
    console.log(localStorage.getItem("token"))
    this.spentService.findAll().subscribe({
    next: (data) => {
      console.log('Dados recebidos do backend:', data);
    },
    error: (err) => {
      console.error('Erro ao carregar gastos:', err);
    }
  });
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
  updateSpent(index: number) {
    const item = this.controle[index];
    this.nome = item.nome;
    this.valor = item.valor;
    this.data = item.data;
    this.editIndex = index;
  }
/* updateSpent(index: number) {
  
  const spent = this.controleFiltrado[index];
  
  const convertedSpend: Spent = {
    uuid: '',                 
    title: spent.nome,
    value: spent.valor,
    data: spent.data,
    type: spent.type 
  };

 
  this.updateSpentModal.openUpdateSpentModal
  (convertedSpend).subscribe(result => {
    if (result) {
     
      spent.nome = result.title;
      spent.valor = result.value;
      spent.data = result.data;
      spent. = result.type
    
      this.toast.showSuccess('Gasto atualizado com sucesso!');
      this.atualizarGraficos();
    }
  });
}*/
/*
  // ❌ Remover
  removerItem(index: number) {
    this.controle.splice(index, 1);
    if (this.editIndex === index) {
     
      this.limparFormulario();
    }
    this.atualizarGraficos();
  }
*/


removerItem(index: number) {
  const gasto = this.controle[index];
  this.dialogService.confirmDeleteSpent(
    "Confirmar exclusão",
    undefined,
    gasto.nome
  ).subscribe(confirmed => {
    if (confirmed) {
      const gastoRemovido = this.controle.splice(index, 1)[0];
      if (this.editIndex === index) {
        this.limparFormulario();
      }
      this.atualizarGraficos();
      
      const snackBarRef = this.toast.showSuccess(`Gasto "${gasto.nome}" removido.`);
      
      snackBarRef.onAction().subscribe(() => {
        //Ele esta pegando o gasto removido e adicionando na primeira posisão 
        // Referencia https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        this.controle.splice(index, 0, gastoRemovido);
        
        this.atualizarGraficos();
        
        this.toast.showGenericMessage(`Gasto "${gasto.nome}" restaurado.`,);
      });

    } else {
      this.toast.showWarning("Exclusão cancelada pelo usuário.");
    }
  });
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
