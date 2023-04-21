import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  /*podemos usar este metodo para comprobar si un usuario esta logeado o no en alguna ruta y redirigirlo o bloquear acceso*/
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.logged()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
  
}
