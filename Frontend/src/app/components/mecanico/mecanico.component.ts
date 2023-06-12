import { Component } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-mecanico',
  templateUrl: './mecanico.component.html',
  styleUrls: ['./mecanico.component.scss']
})
export class MecanicoComponent {

  constructor(
    private router: Router
  ) { }

maquinasReparadas(){
  this.router.navigate(['/Mecanico/MaquinasReparadas']);
}

nuevaReparacion(){
  this.router.navigate(['/Mecanico/NuevaReparacion']);
}


}
