import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    RouterLink
  ]
})
export class LoginComponent {
  email = '';
  password = '';

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Senha:', this.password);
    // Aqui você implementa a lógica de autenticação
  }
}
