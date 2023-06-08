import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  mostrarDetalle(producto: any) {
    const nombreProducto = producto.nombre;
    this.router.navigate(['/detalle-producto/', nombreProducto]);
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }


  obtenerProductos(): void {
    this.authService.obtenerProductos()
      .subscribe(
        productos => {
          this.productos = productos;
        },
        error => {
          console.error('Error al obtener los productos:', error);
        }
      );
  }
}
