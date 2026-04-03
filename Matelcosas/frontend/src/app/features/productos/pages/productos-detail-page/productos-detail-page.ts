import { Component } from '@angular/core';
import { Producto } from '../../data/productos.model';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../data/productos.service';


@Component({
  selector: 'app-productos-detail-page',
  standalone: false,
  templateUrl: './productos-detail-page.html',
  styleUrl: './productos-detail-page.scss',
})
export class ProductosDetailPage {
  producto?: Producto;
  selectedImage = '';
  selectedVariacion?: any;
  cargando = true;

  constructor(
    private productosService: ProductosService,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productosService.obtenerProductoPorId(id).subscribe({
        next: (data) => {
          this.producto = data;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al obtener el producto:', error);
          this.cargando = false;
        },
      });

    }
    
  }

  getImagenPrincipal(): string {
    const img = this.producto?.imagenes?.[0];
    if (!img) return 'assets/img/placeholder-product.png';
    if (img.startsWith('http')) return img;
    return `http://localhost:5000/${img}`;
  }

  seleccionarVariacion(variacion: any) {
    this.selectedVariacion = variacion;
  }
}
