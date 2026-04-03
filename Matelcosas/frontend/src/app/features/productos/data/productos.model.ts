export interface Caracteristicas {
  [key: string]: string | number; // Permite atributos dinámicos como voltaje, marca, etc.
}

export interface Variacion {
  nombre: string;
  precio: number;
  stock: number;
  caracteristicas: Caracteristicas;
}

export interface Producto {
  _id: string;
  nombre: string;
  tags: string[];
  descripcionCorta: string;
  descripcionLarga: string;
  categoria: string;
  subCategoria: string;
  precioBase: number;
  precioOferta?: number;
  porcentajeDescuento?: number;
  stockTotal: number;
  imagenes: string[];
  vistas: number;
  caracteristicas: Caracteristicas;
  variaciones: Variacion[];
  fechaCreacion: Date | string;
  fechaActualizacion: Date | string;
  estado: 'activo' | 'inactivo';
}
