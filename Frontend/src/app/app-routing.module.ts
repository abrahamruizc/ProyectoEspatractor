import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { LoginComponent } from './components/login/login.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { AuthGuard } from './auth.guard';

import { InicioNoRegistradoComponent } from './components/inicio-no-registrado/inicio-no-registrado.component';
import { SkeletonAdministradorComponent } from './layout/skeleton-administrador/skeleton-administrador.component';
import { AdministradorCrearAdministrativoComponent } from './components/administrador-crear-administrativo/administrador-crear-administrativo.component';
import { AdministradorCrearMecanicoComponent } from './components/administrador-crear-mecanico/administrador-crear-mecanico.component';


const routes: Routes = [
  {
    path: '',
    component: SkeletonComponent,
    pathMatch: 'prefix',
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', component: InicioNoRegistradoComponent }
    ]
  },{
    path: 'Administrador',
    component: SkeletonAdministradorComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AdministradorComponent },
      { path: 'CrearAdministrativo', component: AdministradorCrearAdministrativoComponent },
      { path: 'CrearMecanico', component: AdministradorCrearMecanicoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
