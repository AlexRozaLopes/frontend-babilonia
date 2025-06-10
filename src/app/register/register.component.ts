import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    MatSnackBarModule,
    FormsModule
  ]
})
export class RegisterComponent {

  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);


  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  onSubmit() {
    const payload = {
      email: this.email,
      username: this.name,
      password: this.password,
    };

    if (this.password !== this.confirmPassword) {
      this.snackBar.open(
        'As senhas não coincidem!',
        '',
        { duration: 2000, panelClass: ['snackbar-error'] }
      );
    }

    this.http.post('/api/user/add', payload).subscribe({
      next: () => {
        this.snackBar.open(
          'Conta criada com sucesso!',
          '',
          { duration: 2000, panelClass: ['snackbar-success'] }
        );
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open(
          'Erro ao tentar criar a conta. Tente novamente mais tarde.',
          '',
          { duration: 2000, panelClass: ['snackbar-error'] }
        );
      }
    })
  }
}
