import { Component, OnInit } from '@angular/core';
import { AdminService } from '../data/admin.service';

@Component({
  selector: 'app-admin-productos',
  standalone: false,
  templateUrl: './admin-productos.html',
  styleUrl: './admin-productos.scss',
})
export class AdminProductos implements OnInit{
  productos: any[] = [];
  categorias: any[] = [];
  productoEditando: any = null;
  modoEdicion = false;
  vistaActual: 'grid' | 'list' = 'grid';
  mostrarFormulario = false;

  nuevoProducto = {
    nombre: '',
    descripccionCorta: '',
    descripcionLarga: '',
    categoria: '',
    precioBase: 0,
    precioOferta: 0,
    porcentajeDescuento: 0,
    stockTotal: 0,
    imagenes: [''],
    variaciones: [
      {
        nombre: '',
        precioBase: '',
        precioOferta: '',
        porcentajeDescuento: '',
        stockTotal: '',
        imagenes: [''],
      }
    ]
  }

  constructor(private adminService : AdminService){}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();

  }

  //Consultas 

  cargarProductos():void {
    this.adminService.obtenerProductos().subscribe({
      next: (data) => (this.productos = data),
      error: (error) => console.error('Error al cargar el producto',error),
    });
  }

  cargarCategorias(): void {
    this.adminService.obtenerCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: (error) => console.log('Error al cargar las categorias', error ) 
    });
  } 

  editarProducto(producto: any): void {
    this.modoEdicion = true;
    this.productoEditando = { ...producto };
    this.mostrarFormulario = true;
  }

  eliminarProducto(id: string): void {
    if (!confirm('¿Eliminar este producto?')) return;
    this.adminService.eliminarProducto(id).subscribe(() => this.cargarProductos());
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.onFormularioCancelado();
    }
  }

  onProductoGuardado(): void {
    this.cargarProductos();
    this.mostrarFormulario = false;
    this.modoEdicion = false;
    this.productoEditando = null;
  }

  onFormularioCancelado(): void {
    this.modoEdicion = false;
    this.productoEditando = null;
    this.mostrarFormulario = false;
  }


}
