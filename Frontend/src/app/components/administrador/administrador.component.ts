import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { listaAdministrativos, listaMecanicos, AdministrativoI } from '../../models/usuarios.interface';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  Administrativos:listaAdministrativos[] = [];
  Mecanicos:listaMecanicos[] = [];

  public page1!: number;
  public page2!: number;
  constructor(private auth:AuthService, private router:Router) { }
  

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
