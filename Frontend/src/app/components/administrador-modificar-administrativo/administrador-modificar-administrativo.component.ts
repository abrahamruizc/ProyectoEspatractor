import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { datosAdministrativosModificar } from '../../models/usuarios.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador-modificar-administrativo',
  templateUrl: './administrador-modificar-administrativo.component.html',
  styleUrls: ['./administrador-modificar-administrativo.component.scss']
})
export class AdministradorModificarAdministrativoComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private route: ActivatedRoute, private router: Router) { }
  
  formulario!: FormGroup;
  usuarioSeleccionado!: {
    nombre_usuario: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    contrasena: string;
  };

  cancelar() {
    this.router.navigate(['/Administrador']);
  }

  nuevoNombreUsuario!: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.usuarioSeleccionado = {
        nombre_usuario: params['nombre_usuario'],
        nombre: params['nombre'],
        apellido1: params['apellido1'],
        apellido2: params['apellido2'],
        contrasena: ''
      };
      this.nuevoNombreUsuario = this.usuarioSeleccionado.nombre_usuario;
      this.formulario = this.formBuilder.group({
        nombre_usuario: [''],
        nombre: [''],
        apellido1: [''],
        apellido2: [''],
        contrasena: [this.usuarioSeleccionado.contrasena],
        aceptoTerminos: [false, Validators.requiredTrue]
      });
    });

    
  }

  submitFormulario() {
    if (this.formulario.invalid) {
      return;
    }
  
    const formData = this.formulario.value;
  
    const usuarioModificado: datosAdministrativosModificar = {
      nuevo_nombre_usuario: formData.nombre_usuario,
      nombre: formData.nombre,
      apellido1: formData.apellido1,
      apellido2: formData.apellido2,
      nueva_contrasena: formData.contrasena
    };
  
    this.auth.modificarUsuario(this.nuevoNombreUsuario, usuarioModificado).subscribe(
      response => {
        console.log('Usuario administrativo modificado exitosamente:', response);
        this.router.navigate(['/Administrador']);
      },
      error => {
        console.error('Error al modificar el usuario administrativo:', error);
      }
    );
  }
}