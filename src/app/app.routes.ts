import {Routes} from '@angular/router';
import {InicioComponent} from './pages/inicio/inicio.component';
import {SobreComponent} from './pages/sobre/sobre.component';
import {LoginComponent} from './login/login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {RecoveryComponent} from './login/recovery/recovery.component';
import {ControleComponent} from './pages/controle/controle.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'sobre', component: SobreComponent},
  {path: 'cadastro', component: RegisterComponent},
  {path: 'recovery', component: RecoveryComponent},
  {path: 'controle', component: ControleComponent},
];
