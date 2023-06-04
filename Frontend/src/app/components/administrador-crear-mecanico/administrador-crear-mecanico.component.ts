import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-administrador-crear-mecanico',
  templateUrl: './administrador-crear-mecanico.component.html',
  styleUrls: ['./administrador-crear-mecanico.component.scss']
})
export class AdministradorCrearMecanicoComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      nombre_usuario: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellido1: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      apellido2: ['', Validators.pattern('^[a-zA-Z ]+$')],
      contrasena: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      DNI: ['', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]]
    });
  }

  ngOnInit() {
  }

  cancelar() {
    this.router.navigate(['/Administrador']);
  }

  creado() {
    if (this.formulario.invalid) {
      return;
    }

    const user = {
      nombre_usuario: this.formulario.value.nombre_usuario,
      rol: 'MECÁNICO',
      nombre: this.formulario.value.nombre,
      apellido1: this.formulario.value.apellido1,
      apellido2: this.formulario.value.apellido2,
      contrasena: this.formulario.value.contrasena,
      DNI: this.formulario.value.DNI
    };

    this.authService.crearUsuarioMecanico(user).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/Administrador']);
      },
      err => console.log(err)
    );
  }
}