export interface Categoria {
  _id?: string;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  estado: 'activo' | 'inactivo';
}
