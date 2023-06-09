import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { InicioNoRegistradoComponent } from './components/inicio-no-registrado/inicio-no-registrado.component';
import { SkeletonAdministradorComponent } from './layout/skeleton-administrador/skeleton-administrador.component';
import { SkeletonAdministrativoComponent } from './layout/skeleton-administrativo/skeleton-administrativo.component';
import { SkeletonMecanicoComponent } from './layout/skeleton-mecanico/skeleton-mecanico.component';
import { HeaderUsuarioComponent } from './layout/header-usuario/header-usuario.component';
import { NavigationVacioComponent } from './layout/navigation-vacio/navigation-vacio.component';
import { AdministradorCrearAdministrativoComponent } from './components/administrador-crear-administrativo/administrador-crear-administrativo.component';
import { AdministradorCrearMecanicoComponent } from './components/administrador-crear-mecanico/administrador-crear-mecanico.component';
import { AdministrativoComponent } from './components/administrativo/administrativo.component';
import { MecanicoComponent } from './components/mecanico/mecanico.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { AdministradorModificarAdministrativoComponent } from './components/administrador-modificar-administrativo/administrador-modificar-administrativo.component';
import { AdministradorModificarMecanicoComponent } from './components/administrador-modificar-mecanico/administrador-modificar-mecanico.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapaComponent } from './components/mapa/mapa.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CorreoComponent } from './components/correo/correo.component';
import { MaquinasReparadasComponent } from './components/maquinas-reparadas/maquinas-reparadas.component';
import { NuevaReparacionComponent } from './components/nueva-reparacion/nueva-reparacion.component';
import { FooterUsuarioComponent } from './layout/footer-usuario/footer-usuario.component';
import { ProductosComponent } from './components/productos/productos.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';

import { PathLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    SkeletonComponent,
    HeaderComponent,
    LoginComponent,
    AdministradorComponent,
    InicioNoRegistradoComponent,
    SkeletonAdministradorComponent,
    AdministradorCrearAdministrativoComponent,
    AdministradorCrearMecanicoComponent,
    NavigationVacioComponent,
    HeaderUsuarioComponent,
    SkeletonAdministrativoComponent,
    SkeletonMecanicoComponent,
    AdministrativoComponent,
    MecanicoComponent,
    AdministradorModificarAdministrativoComponent,
    AdministradorModificarMecanicoComponent,
    MapaComponent,
    ContactoComponent,
    CorreoComponent,
    MaquinasReparadasComponent,
    NuevaReparacionComponent,
    FooterUsuarioComponent,
    ProductosComponent,
    EmpresaComponent,
    DetalleProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide:PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
