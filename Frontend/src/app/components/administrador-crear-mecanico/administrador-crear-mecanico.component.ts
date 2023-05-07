import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-administrador-crear-mecanico',
  templateUrl: './administrador-crear-mecanico.component.html',
  styleUrls: ['./administrador-crear-mecanico.component.scss']
})
export class AdministradorCrearMecanicoComponent implements OnInit {

  user = {
    nombre_usuario: '',
    rol: 'MECÁNICO',
    nombre: '',
    apellido1: '',
    apellido2: '',
    contrasena: '',
    DNI: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  creado() {
    this.authService.crearUsuarioMecanico(this.user).subscribe(res => {
          console.log(res);
          this.router.navigate(['/Administrador']);
        },
        err => console.log(err)
      )
  }


}
