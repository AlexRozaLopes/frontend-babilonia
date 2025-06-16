import { inject, Injectable } from '@angular/core';
import { Spent } from '../interface/spent';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalUpdateSpentComponent } from '../components/modal-update-spent/modal-update-spent.component';
import { SpentType } from '../interface/spentType';

@Injectable({
  providedIn: 'root'
})
export class ModalUpdateSpentService {

  constructor() { }
  private dialog = inject(MatDialog);
  openUpdateSpentModal(gasto?: Spent): Observable<Spent | undefined> {
    const dialogRef = this.dialog.open(ModalUpdateSpentComponent, {
      width: '600px',
      data: {
        spent: gasto ?? { uuid: '', title: '', value: 0, type: SpentType },
        title: gasto ? 'Editar Gasto' : 'Novo Gasto'
      }
    });

    return dialogRef.afterClosed();
  }
}
