import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maquinas-reparadas',
  templateUrl: './maquinas-reparadas.component.html',
  styleUrls: ['./maquinas-reparadas.component.scss']
})
export class MaquinasReparadasComponent {
  reparaciones: any[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerReparaciones();
  }

  nuevaReparacion(){
    this.router.navigate(['/Mecanico/NuevaReparacion']);
  }

  obtenerReparaciones(): void {
    this.authService.obtenerReparaciones().subscribe(
      (reparaciones: any) => {
        this.reparaciones = reparaciones;
      },
      (error) => {
        console.error('Error al obtener las reparaciones', error);
      }
    );
  }
}