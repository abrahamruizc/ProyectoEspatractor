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
      nombre_cliente: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      correo_electronico: ['', [Validators.required, Validators.email]],
      referencia: ['', Validators.required],
      horas_trabajo: [''],
      kilometros: [''],
      marca: [''],
      modelo: [''],
      ano_matriculacion: [''],
      tipo: [''],
      h_mano_de_obra: ['', Validators.required],
      fecha_reparacion: ['', Validators.required],
      precio_piezas: ['', Validators.required],
      descripcion_reparacion: [''],
      total: ['']
    });
  }
  
  calcularTotal() {
    const horasManoDeObra = this.formulario.get('h_mano_de_obra')?.value;
    const precioPiezas = this.formulario.get('precio_piezas')?.value;
  
    // Realiza el cálculo
    const total = horasManoDeObra * 30 + precioPiezas;
  
    // Actualiza el valor del campo "Total"
    this.formulario.get('total')?.setValue(total);
  }

  cancelar() {
    this.router.navigate(['/Mecanico/MaquinasReparadas']);
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
                this.router.navigate(['/Mecanico/MaquinasReparadas']);
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
