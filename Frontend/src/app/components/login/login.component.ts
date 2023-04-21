import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    nombre_usuario: '',
    contrasena: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.loginUsuario(this.user).subscribe(res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/Administrador']);
        },
        err => console.log(err)
      )
  }

}