import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-reparacion',
  templateUrl: './nueva-reparacion.component.html',
  styleUrls: ['./nueva-reparacion.component.scss']
})
export class NuevaReparacionComponent implements OnInit {
  formulario!: FormGroup;
  clienteId: string | undefined;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nombre_cliente: [''],
      telefono: [''],
      correo_electronico: [''],
      referencia: [''],
      horas_trabajo: [''], 
      kilometros: [''],
      marca: [''],
      modelo: [''],
      ano_matriculacion: [''],
      tipo: [''],
      h_mano_de_obra: [''],
      fecha_reparacion: [''],
      precio_piezas: [''],
      descripcion_reparacion: [''],
      total: ['']
    });
  }
  
  cancelar() {
    this.router.navigate(['/Mecanico']);
  }

  crearReparacion(formulario: any) {
    const cliente = {
      nombre: formulario.nombre_cliente,
      telefono: formulario.telefono,
      correo_electronico: formulario.correo_electronico
    };

    const maquina = {
      referencia: formulario.referencia,
      horas_trabajo: formulario.horas_trabajo,
      kilometros: formulario.kilometros,
      marca: formulario.marca,
      modelo: formulario.modelo,
      ano_matriculacion: formulario.ano_matriculacion,
      tipo: formulario.tipo
    };

    const reparacion = {
      id_maquina: '',
      h_mano_de_obra: formulario.h_mano_de_obra,
      fecha_reparacion: formulario.fecha_reparacion,
      precio_piezas: formulario.precio_piezas,
      descripcion_reparacion: formulario.descripcion_reparacion,
      total: formulario.total
    };

    console.log(cliente);
    console.log(maquina);
    console.log(reparacion);

    // Llamar a las funciones de creación del servicio
    this.authService.crearCliente(cliente).subscribe(
      (respuestaCliente) => {
        this.clienteId = (respuestaCliente as any)?.cliente?._id;
        console.log(this.clienteId);
  
        this.authService.crearMaquina({ ...maquina, clienteId: this.clienteId || '' }).subscribe(
          (respuestaMaquina) => {
            console.log('Máquina creada:', respuestaMaquina);
            reparacion.id_maquina = (respuestaMaquina as any)?.maquina?._id;

            this.authService.crearReparacion(reparacion).subscribe(
              (respuestaReparacion) => {
                console.log('Reparación creada:', respuestaReparacion);
                // Realizar acciones adicionales después de crear la reparación
              },
              (errorReparacion) => {
                console.error('Error al crear la reparación:', errorReparacion);
              }
            );
          },
          (errorMaquina) => {
            console.error('Error al crear la máquina:', errorMaquina);
          }
        );
      },
      (errorCliente) => {
        console.error('Error al crear el cliente:', errorCliente);
      }
    );
  }
}
