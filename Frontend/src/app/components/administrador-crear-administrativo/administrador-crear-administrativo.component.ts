import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-administrador-crear-administrativo',
  templateUrl: './administrador-crear-administrativo.component.html',
  styleUrls: ['./administrador-crear-administrativo.component.scss']
})
export class AdministradorCrearAdministrativoComponent implements OnInit {

  user = {
    nombre_usuario: '',
    rol: 'ADMINISTRATIVO',
    nombre: '',
    apellido1: '',
    apellido2: '',
    contrasena: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  creado() {
    this.authService.crearUsuarioAdministrativo(this.user).subscribe(res => {
          console.log(res);
          this.router.navigate(['/Administrador']);
        },
        err => console.log(err)
      )
  }

}
