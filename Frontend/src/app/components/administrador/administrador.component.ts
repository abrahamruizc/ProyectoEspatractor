import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { listaAdministrativos, listaMecanicos} from '../../models/usuarios.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router, private modalService: NgbModal) { }

  Administrativos:listaAdministrativos[] = [];
  Mecanicos:listaMecanicos[] = [];

  public page1!: number;
  public page2!: number;
  
  

  ngOnInit(): void {
    this.auth.getAdministrativos("ADMINISTRATIVO").subscribe(data =>{
      this.Administrativos = data;
      console.log(this.Administrativos);
    });

    this.auth.getMecanicos("MECÁNICO").subscribe(data =>{
      this.Mecanicos = data;
      console.log(this.Mecanicos);
    });

  }

  openConfirmationModal(content: any, administrativo: listaAdministrativos) {
    this.modalService.open(content).result.then(
      (result) => {
        if (result === 'confirm') {
          this.delete(administrativo.nombre_usuario);
        }
      },
      (reason) => {
        console.log("se cierra el modal");
      }
    );
  }

  seleccionarUsuarioAdministrativo(nombre_usuario: string, nombre: string, apellido1: string, apellido2: string) {
  
    this.router.navigate(['/Administrador/ModificarAdministrativo'], { 
      queryParams: { 
        nombre_usuario: nombre_usuario,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2
      }
    });
    
  }

  seleccionarUsuarioMecanico(nombre_usuario: string, nombre: string, apellido1: string, apellido2: string, dni: string) {
    this.router.navigate(['/Administrador/ModificarMecanico'], { 
      queryParams: { 
        nombre_usuario: nombre_usuario,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        dni: dni
      }
    });
  }
  
  delete(nombre_usuario: string) {
    this.auth.delete(nombre_usuario).subscribe(
      (response: any) => {
        console.log(response); 
        
        window.location.reload(); 
      },
      (error: HttpErrorResponse) => {
        console.log('Error al eliminar el usuario', error);
        // Realiza el manejo de errores aquí, por ejemplo, mostrar un mensaje de error al usuario
      }
    );
  }


}
