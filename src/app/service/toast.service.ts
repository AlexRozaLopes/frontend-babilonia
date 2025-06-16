import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum Action {
  SAIR = 'Sair',
  DESFAZER = 'Desfazer',
  TENTAR_NOVAMENTE = 'Tentar Novamente',
  ERROR = 'Erro'
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private snackBar = inject(MatSnackBar);
  DEFAULT_DURATION:number = 3000;
  showGenericMessage(message: string, action?: Action, time?: number) {
    const panelClass = this.findAction(action);
    this.snackBar.open(message, action, {
      duration: time ?? this.DEFAULT_DURATION,
      panelClass: [panelClass],
    });
  }

// preciso retorna o referencial 
 showSuccess(message: string, action: Action = Action.DESFAZER, time?: number) {
  return this.snackBar.open(message, action, {
    duration: time ?? 3000,
    panelClass: ['snackbar-success'],
  });
}

  showWarning(message: string, action: Action = Action.TENTAR_NOVAMENTE, time?: number) {
    this.snackBar.open(message, action, {
      duration: time ?? this.DEFAULT_DURATION,
      panelClass: ['snackbar-warning'],
    });
  }


  showError(message: string, time?: number) {
    this.snackBar.open(message, 'Erro', {
      duration: time ?? this.DEFAULT_DURATION,
      panelClass: ['snackbar-error'],
    });
  }

  showInfo(message: string, action: Action = Action.SAIR, time?: number) {
    this.snackBar.open(message, action, {
      duration: time ?? this.DEFAULT_DURATION,
      panelClass: ['snackbar-info'],
    });
  }

  private findAction(action?: Action): string {
    switch (action) {
      case Action.SAIR:
      case Action.DESFAZER:
      case Action.TENTAR_NOVAMENTE:
        return 'snackbar-success';
      case Action.ERROR:
        return 'snackbar-error';
      default:
        return 'custom-snackbar-default';
    }
  }
}