import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { LoginComponent } from './components/login/login.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { AuthGuard } from './auth.guard';

import { InicioNoRegistradoComponent } from './components/inicio-no-registrado/inicio-no-registrado.component';
import { SkeletonAdministradorComponent } from './layout/skeleton-administrador/skeleton-administrador.component';
import { SkeletonAdministrativoComponent } from './layout/skeleton-administrativo/skeleton-administrativo.component';
import { SkeletonMecanicoComponent } from './layout/skeleton-mecanico/skeleton-mecanico.component';
import { AdministradorCrearAdministrativoComponent } from './components/administrador-crear-administrativo/administrador-crear-administrativo.component';
import { AdministradorCrearMecanicoComponent } from './components/administrador-crear-mecanico/administrador-crear-mecanico.component';
import { AdministrativoComponent } from './components/administrativo/administrativo.component';
import { MecanicoComponent } from './components/mecanico/mecanico.component';
import { AdministradorModificarMecanicoComponent } from './components/administrador-modificar-mecanico/administrador-modificar-mecanico.component';
import { AdministradorModificarAdministrativoComponent } from './components/administrador-modificar-administrativo/administrador-modificar-administrativo.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { MaquinasReparadasComponent } from './components/maquinas-reparadas/maquinas-reparadas.component';
import { NuevaReparacionComponent } from './components/nueva-reparacion/nueva-reparacion.component';
import { ProductosComponent } from './components/productos/productos.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';

const routes: Routes = [
  {
    path: '',
    component: SkeletonComponent,
    pathMatch: 'prefix',
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', component: InicioNoRegistradoComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'empresa', component: EmpresaComponent },
      { path: 'detalle-producto/:nombre', component: DetalleProductoComponent }
    ]
  },{
    path: 'Administrador',
    component: SkeletonAdministradorComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AdministradorComponent },
      { path: 'CrearAdministrativo', component: AdministradorCrearAdministrativoComponent },
      { path: 'CrearMecanico', component: AdministradorCrearMecanicoComponent },
      { path: 'ModificarAdministrativo', component: AdministradorModificarAdministrativoComponent },
      { path: 'ModificarMecanico', component: AdministradorModificarMecanicoComponent }
    ]
  },{
    path: 'Administrativo',
    component: SkeletonAdministrativoComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AdministrativoComponent }
    ]
  },{
    path: 'Mecanico',
    component: SkeletonMecanicoComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MecanicoComponent },
      { path: 'MaquinasReparadas', component: MaquinasReparadasComponent },
      { path: 'NuevaReparacion', component: NuevaReparacionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
