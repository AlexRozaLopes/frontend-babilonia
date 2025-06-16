import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent} from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(MatDialog);
  confirmDeleteSpent(
  title: string = "Você tem certeza? ",
  message: string = "Tem certeza que deseja excluir o gasto? ",
  nameSpend?: string
): Observable<boolean> {
  if (nameSpend) {
    message = `Tem certeza que deseja excluir o gasto: "${nameSpend}"? `;
  }
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '350px',
    data: { title, message }
  });

  return dialogRef.afterClosed();
}
}
