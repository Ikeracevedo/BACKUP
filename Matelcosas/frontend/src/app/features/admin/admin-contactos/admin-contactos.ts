import { Component, OnInit } from '@angular/core';
import { AdminService } from '../data/admin.service';

@Component({
  selector: 'app-admin-contactos',
  standalone: false,
  templateUrl: './admin-contactos.html',
  styleUrls: ['./admin-contactos.scss'],
})
export class AdminContactos implements OnInit {
  contactos: any[] = [];
  contactosFiltrados: any[] = [];
  contactoSeleccionado: any = null;
  cargando = false;
  vistaActual: 'grid' | 'list' = 'list';
  filtroActual: 'todos' | 'sin-atender' | 'atendidos' = 'todos';
  busqueda = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.obtenerContactos();
  }

  obtenerContactos(): void {
    this.cargando = true;
    this.adminService.obtenerContactos().subscribe({
      next: (res: any[]) => {
        // Ordena: primero los no atendidos, luego por fecha
        this.contactos = res.sort((a: any, b: any) => {
          if ((a.estado === 'Atendido' || a.estado === true) !== (b.estado === 'Atendido' || b.estado === true)) {
            return (a.estado === 'Atendido' || a.estado === true) ? 1 : -1;
          }
          return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        });
        this.aplicarFiltros();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar contactos', err);
        this.cargando = false;
      }
    });
  }

  aplicarFiltros(): void {
    let resultado = [...this.contactos];

    // Filtrar por estado
    if (this.filtroActual === 'sin-atender') {
      resultado = resultado.filter(c => c.estado === false || c.estado === 'Sin atender');
    } else if (this.filtroActual === 'atendidos') {
      resultado = resultado.filter(c => c.estado === true || c.estado === 'Atendido');
    }

    // Filtrar por búsqueda
    if (this.busqueda.trim()) {
      const termino = this.busqueda.toLowerCase();
      resultado = resultado.filter(c =>
        c.nombre?.toLowerCase().includes(termino) ||
        c.correo?.toLowerCase().includes(termino) ||
        c.mensaje?.toLowerCase().includes(termino) ||
        c.telefono?.includes(termino)
      );
    }

    this.contactosFiltrados = resultado;
  }

  cambiarFiltro(filtro: 'todos' | 'sin-atender' | 'atendidos'): void {
    this.filtroActual = filtro;
    this.aplicarFiltros();
  }

  buscar(): void {
    this.aplicarFiltros();
  }

  seleccionarContacto(contacto: any): void {
    this.contactoSeleccionado = contacto;
  }

  cerrarDetalle(): void {
    this.contactoSeleccionado = null;
  }

  marcarComoAtendido(contacto: any, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const nuevoEstado = !contacto.estado;
    this.adminService.actualizarEstadoContacto(contacto._id, nuevoEstado).subscribe({
      next: () => {
        contacto.estado = nuevoEstado;
        this.aplicarFiltros();
      },
      error: (error) => console.error('Error al actualizar estado:', error)
    });
  }

  eliminarContacto(id: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    if (confirm('¿Seguro que deseas eliminar este contacto?')) {
      this.adminService.eliminarContactos(id).subscribe({
        next: () => {
          this.contactos = this.contactos.filter((c: any) => c._id !== id);
          if (this.contactoSeleccionado?._id === id) {
            this.contactoSeleccionado = null;
          }
          this.aplicarFiltros();
        },
        error: (err) => console.error('Error al eliminar contacto', err)
      });
    }
  }

  get estadisticas() {
    const total = this.contactos.length;
    const atendidos = this.contactos.filter(c => c.estado === true || c.estado === 'Atendido').length;
    const sinAtender = total - atendidos;
    return { total, atendidos, sinAtender };
  }

  get contactosPorMostrar() {
    return this.contactosFiltrados;
  }
}
