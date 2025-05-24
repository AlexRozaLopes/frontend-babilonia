import {Routes} from '@angular/router';
import {InicioComponent} from './inicio/inicio.component';
import {SobreComponent} from './sobre/sobre.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RecoveryComponent} from './recovery/recovery.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'sobre', component: SobreComponent},
  {path: 'cadastro', component: RegisterComponent},
  {path: 'recovery', component: RecoveryComponent},
];
