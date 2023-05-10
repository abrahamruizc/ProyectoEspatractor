import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { listaAdministrativos, listaMecanicos } from '../../models/usuarios.interface';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  Administrativos:listaAdministrativos[] = [];
  Mecanicos:listaMecanicos[] = [];

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

}
