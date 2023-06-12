import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {
  nombreProducto: string | null;
  producto: any;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.nombreProducto = null;
  }

  ngOnInit(): void {
    // obtenemos el nombre del producto de los parámetros de la URL
    this.nombreProducto = this.route.snapshot.paramMap.get('nombre');
    if (this.nombreProducto) {
      this.obtenerProducto();
    } else {
      console.error('Nombre de producto no válido');
    }
  }

  volverAProductos(): void {
    this.router.navigate(['/productos']);
  }

  obtenerProducto(): void {
    this.authService.obtenerProductos()
      .subscribe(
        productos => {
          this.producto = productos.find(producto => producto.nombre === this.nombreProducto);
        },
        error => {
          console.error('Error al obtener los productos:', error);
        }
      );
  }
}