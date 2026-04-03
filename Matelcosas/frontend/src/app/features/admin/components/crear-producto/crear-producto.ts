import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { AdminService } from '../../data/admin.service';

@Component({
  selector: 'app-crear-producto',
  standalone: false,
  templateUrl: './crear-producto.html',
  styleUrl: './crear-producto.scss',
})
export class CrearProducto implements OnInit, OnChanges {
  @Input() modoEdicion = false;
  @Input() productoEditando: any = null;
  @Output() productoGuardado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();
  
  categorias: any[] = [];
  subCategorias: string[] = [];
  
  nuevoProducto: any = {
    nombre: '',
    tags: [],
    descripccionCorta: '',
    descripcionLarga: '',
    categoria: '',
    subCategoria: '',
    precioBase: 0,
    precioOferta: 0,
    porcentajeDescuento: 0,
    stockTotal: 0,
    imagenes: [''],
    caracteristicas: {},  
    estado: 'activo',
    variaciones: [
      {
        nombre: '',
        precio: 0,  
        stock: 0,   
        caracteristicas: {} 
      }
    ]
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarCategorias();
    if (this.modoEdicion && this.productoEditando) {
      this.cargarProductoParaEditar();
    }
  }

  ngOnChanges(): void {
    if (this.modoEdicion && this.productoEditando) {
      this.cargarProductoParaEditar();
    } else if (!this.modoEdicion) {
      this.reiniciarFormulario();
    }
  }

  cargarCategorias(): void {
  this.adminService.obtenerCategorias().subscribe({
    next: (data) => (this.categorias = data),
    error: (error) => console.log('Error al cargar las categorias', error)
  });
}


  onCategoriaChange(): void {
    const categoriaSeleccionada = this.categorias.find(
      cat => cat.nombre === this.nuevoProducto.categoria
    );
    
    if (categoriaSeleccionada && categoriaSeleccionada.subCategorias) {
      this.subCategorias = categoriaSeleccionada.subCategorias;
    } else {
      this.subCategorias = [];
    }
    
    // Resetear subCategoría si cambió la categoría
    this.nuevoProducto.subCategoria = '';
  }


  cargarProductoParaEditar(): void {
    this.nuevoProducto = {
      nombre: this.productoEditando.nombre,
      tags: this.productoEditando.tags || [],
      descripccionCorta: this.productoEditando.descripccionCorta,
      descripcionLarga: this.productoEditando.descripcionLarga,
      categoria: this.productoEditando.categoria,
      subCategoria: this.productoEditando.subCategoria || '',
      precioBase: this.productoEditando.precioBase,
      precioOferta: this.productoEditando.precioOferta,
      porcentajeDescuento: this.productoEditando.porcentajeDescuento,
      stockTotal: this.productoEditando.stockTotal,
      imagenes: this.productoEditando.imagenes || [''],
      caracteristicas: this.productoEditando.caracteristicas || {},
      estado: this.productoEditando.estado || 'activo',
      variaciones: this.productoEditando.variaciones || []
    };
  }

  crearProducto(): void {
    if (!this.nuevoProducto.nombre.trim()) return;

    this.adminService.crearProducto(this.nuevoProducto).subscribe({
      next: () => {
        this.productoGuardado.emit();
        this.reiniciarFormulario();
      },
      error: (error) => console.log('Error al crear el producto', error)
    });
  }

  actualizarProducto(): void {
    if (!this.nuevoProducto.nombre.trim()) return;
    
    this.adminService.actualizarProducto(this.productoEditando._id, this.nuevoProducto).subscribe({
      next: () => {
        this.productoGuardado.emit();
        this.reiniciarFormulario();
      },
      error: (error) => console.log('Error al actualizar el producto', error)
    });
  }

  guardarProducto(): void {
    if (this.modoEdicion) {
      this.actualizarProducto();
    } else {
      this.crearProducto();
    }
  }

  cancelarEdicion(): void {
    this.cancelado.emit();
    this.reiniciarFormulario();
  }

  reiniciarFormulario(): void {
    this.nuevoProducto = {
      nombre: '',
      tags: [],
      descripccionCorta: '',
      descripcionLarga: '',
      categoria: '',
      subCategoria: '',
      precioBase: 0,
      precioOferta: 0,
      porcentajeDescuento: 0,
      stockTotal: 0,
      imagenes: [''],
      caracteristicas: {},
      estado: 'activo',
      variaciones: [
        {
          nombre: '',
          precio: 0,
          stock: 0,
          caracteristicas: {}
        }
      ]
    };
  }

  // Métodos para manejar imágenes
  agregarImagen(): void {
    this.nuevoProducto.imagenes.push('');
  }

  // Métodos para manejar variaciones
  agregarVariacion(): void {
    this.nuevoProducto.variaciones.push({
      nombre: '',
      precio: 0,
      stock: 0,
      caracteristicas: {}
    });
  }

  eliminarVariacion(index: number): void {
    this.nuevoProducto.variaciones.splice(index, 1);
  }

  // Métodos para manejar características del producto
  getCaracteristicasKeys(): string[] {
    return Object.keys(this.nuevoProducto.caracteristicas);
  }

  agregarCaracteristica(): void {
    const newKey = `caracteristica_${Date.now()}`;
    this.nuevoProducto.caracteristicas[newKey] = '';
  }

  eliminarCaracteristica(key: string): void {
    delete this.nuevoProducto.caracteristicas[key];
  }

  updateCaracteristicaKey(oldKey: string, event: any): void {
    const newKey = event.target.value;
    if (newKey && newKey !== oldKey) {
      const value = this.nuevoProducto.caracteristicas[oldKey];
      delete this.nuevoProducto.caracteristicas[oldKey];
      this.nuevoProducto.caracteristicas[newKey] = value;
    }
  }

  // Métodos para manejar características de variaciones
  getVariacionCaracteristicasKeys(index: number): string[] {
    return Object.keys(this.nuevoProducto.variaciones[index].caracteristicas || {});
  }

  agregarVariacionCaracteristica(index: number): void {
    const newKey = `caracteristica_${Date.now()}`;
    if (!this.nuevoProducto.variaciones[index].caracteristicas) {
      this.nuevoProducto.variaciones[index].caracteristicas = {};
    }
    this.nuevoProducto.variaciones[index].caracteristicas[newKey] = '';
  }

  eliminarVariacionCaracteristica(index: number, key: string): void {
    delete this.nuevoProducto.variaciones[index].caracteristicas[key];
  }

  updateVariacionCaracteristicaKey(index: number, oldKey: string, event: any): void {
    const newKey = event.target.value;
    if (newKey && newKey !== oldKey) {
      const value = this.nuevoProducto.variaciones[index].caracteristicas[oldKey];
      delete this.nuevoProducto.variaciones[index].caracteristicas[oldKey];
      this.nuevoProducto.variaciones[index].caracteristicas[newKey] = value;
    }
  }

  // Método para procesar tags
  processTags(value: string): void {
    this.nuevoProducto.tags = value.split(',').map(t => t.trim()).filter(t => t);
  }
}
