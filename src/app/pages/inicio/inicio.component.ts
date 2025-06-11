import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
