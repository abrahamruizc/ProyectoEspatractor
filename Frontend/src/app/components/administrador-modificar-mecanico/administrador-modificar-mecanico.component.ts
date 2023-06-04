import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { datosMecanicoModificar } from '../../models/usuarios.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador-modificar-mecanico',
  templateUrl: './administrador-modificar-mecanico.component.html',
  styleUrls: ['./administrador-modificar-mecanico.component.scss']
})
export class AdministradorModificarMecanicoComponent implements OnInit {
  formulario!: FormGroup;
  usuarioSeleccionado!: {
    dni: string;
    nombre_usuario: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    contrasena: string;
  };
  nuevoNombreUsuario!: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuarioSeleccionado = {
        dni: params['dni'],
        nombre_usuario: params['nombre_usuario'],
        nombre: params['nombre'],
        apellido1: params['apellido1'],
        apellido2: params['apellido2'],
        contrasena: ''
      };
      this.nuevoNombreUsuario = this.usuarioSeleccionado.nombre_usuario;
      
      this.formulario = this.formBuilder.group({
        dni: ['', Validators.pattern(/^\d{8}[A-Z]$/)],
        nombre_usuario: [''],
        nombre: ['', Validators.pattern('^[a-zA-Z ]+$')],
        apellido1: ['', Validators.pattern('^[a-zA-Z ]+$')],
        apellido2: ['', Validators.pattern('^[a-zA-Z ]+$')],
        contrasena: ['', Validators.pattern('^[a-zA-Z0-9!@#$%^&*()]+$')],
        aceptoTerminos: [false, Validators.requiredTrue]
      });
    });
  }

  submitFormulario(): void {
    if (this.formulario.invalid) {
      return;
    }

    const formData = this.formulario.value;

    const mecanicoModificado: datosMecanicoModificar = {
      nuevo_nombre_usuario: formData.nombre_usuario,
      dni: formData.dni,
      nombre: formData.nombre,
      apellido1: formData.apellido1,
      apellido2: formData.apellido2,
      nueva_contrasena: formData.contrasena
    };

    this.auth.modificarUsuario(this.nuevoNombreUsuario, mecanicoModificado).subscribe(
      response => {
        console.log('Mecánico modificado exitosamente:', response);
        this.router.navigate(['/Administrador']);
      },
      error => {
        console.error('Error al modificar el mecánico:', error);
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/Administrador']);
  }
}