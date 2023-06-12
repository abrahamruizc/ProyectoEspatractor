import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {};
  loginForm: FormGroup = new FormGroup({});
  errorMensaje: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nombre_usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.user = this.loginForm.value;
  
    this.authService.loginUsuario(this.user).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        console.log(res.rol);
  
        switch (res.rol) {
          case 'ADMINISTRADOR':
            this.router.navigate(['/Administrador']);
            break;
          case 'ADMINISTRATIVO':
            this.router.navigate(['/Administrativo']);
            break;
          case 'MECÁNICO':
            this.router.navigate(['/Mecanico']);
            break;
          default:
            console.log("No es un tipo de administrador válido");
        }
      },
      err => { 
      console.log(err);
      this.errorMensaje = 'Nombre de usuario o contraseña incorrectos.';
    }
    );
  }
}