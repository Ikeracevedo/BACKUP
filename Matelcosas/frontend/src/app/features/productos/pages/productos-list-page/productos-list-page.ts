import { Component } from '@angular/core';
import { Producto } from '../../data/productos.model';
import { Router } from '@angular/router';
import { ProductosService } from '../../data/productos.service';


@Component({
  selector: 'app-productos-list-page',
  standalone: false,
  templateUrl: './productos-list-page.html',
  styleUrl: './productos-list-page.scss',
})
export class ProductosListPage {
  productos: Producto[] = [];
  cargando = true;

  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productosService.obtenerTodosLosProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
        this.cargando = false;  
      },
    });
  }

  verDetalle(id: string) {
    this.router.navigate(['/productos', id]);
  }
}
