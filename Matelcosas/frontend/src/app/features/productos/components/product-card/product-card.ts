import { Component, Input, input } from '@angular/core';
import { Producto } from '../../data/productos.model';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() producto!: Producto;

  obtenerImagenPrincipal(): string {
    const img = this.producto.imagenes?.[0];
    if (!img) return 'assets/img/placeholder-product.png';
    if (img.startsWith('http')) return img;
    return `http://localhost:5000/${img}`
  }

  tieneDescuento(): boolean {
    return !!this.producto.precioOferta && this.producto.precioOferta < this.producto.precioBase;
  }
  
  porcentajeDescuento(): number {
    if (!this.producto.precioOferta || !this.producto.precioBase) return 0;
    return Math.round(((this.producto.precioBase - this.producto.precioOferta) / this.producto.precioBase) * 100);
  }

}
