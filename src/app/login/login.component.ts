import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    MatSnackBarModule,
    FormsModule,
    RouterLink
  ]
})
export class LoginComponent {
  email = '';
  password = '';

  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  private router = inject(Router);

  onSubmit() {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'spring');
    body.set('username', this.email);
    body.set('password', this.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post<any>(
      '/realms/master/protocol/openid-connect/token',
      body.toString(),
      { headers }
    ).subscribe({
      next: (res) => {
        const token = res.access_token;
        localStorage.setItem('token', token);
        console.log('Login bem-sucedido!');
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.snackBar.open(
          'Erro ao conectar com a conta. Tente novamente mais tarde.',
          '',
          { duration: 2000, panelClass: ['snackbar-error'] }
        );
      }
    });
  }
}
