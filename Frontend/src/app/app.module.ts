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



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    SkeletonComponent,
    HeaderComponent,
    LoginComponent,
    AdministradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
