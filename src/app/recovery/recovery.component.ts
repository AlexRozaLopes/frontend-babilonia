import { Component, inject, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true, // ✅ importante para usar `imports`
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  imports: [
    MatSnackBarModule,
    FormsModule
  ]
})
@Injectable({ providedIn: 'root' })
export class RecoveryComponent {
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  email = '';

  onSubmit() {
    console.log('Solicitar recuperação para:', this.email);

    const payload = {
      email: this.email
    };

    this.http.patch('/api/user/change-password', payload, {
      responseType: 'text'
    }).subscribe({
      next: () => {
        this.snackBar.open(
          'Se este email estiver cadastrado, um link de recuperação foi enviado!',
          '',
          { duration: 5000, panelClass: ['snackbar-success'] }
        );
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open(
          'Erro ao tentar enviar o e-mail. Tente novamente mais tarde.',
          '',
          { duration: 5000, panelClass: ['snackbar-error'] }
        );
      }
    });
  }
}
