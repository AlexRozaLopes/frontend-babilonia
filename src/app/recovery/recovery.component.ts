import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  imports: [
    FormsModule
  ]
})
export class RecoveryComponent {
  email = '';

  onSubmit() {
    console.log('Solicitar recuperação para:', this.email);
    alert('Se este email estiver cadastrado, você receberá um link para redefinir sua senha.');
    // Aqui você implementa a lógica de envio de email
  }
}
