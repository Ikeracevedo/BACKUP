import { Component } from '@angular/core';
import { AdminService } from '../data/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-categorias',
  templateUrl: './admin-categorias.html',
  styleUrl: './admin-categorias.scss',
  standalone: false,
})
export class AdminCategorias {
  categorias: any[] = [];
  categoriaEditando: any = null;
  modoEdicion = false;
  vistaActual: 'grid' | 'list' = 'grid';
  mostrarFormulario = false;


  constructor(private adminService: AdminService){}

  //Al iniciar cargo la informacion de las categorias
  ngOnInit(): void {
    this.cargarCategorias();
  }

  //Hago una peticion al backend para traer todas las categorias
  cargarCategorias(): void {
    this.adminService.obtenerCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar la informacion',
          text: 'No se pudieron cargar las categorias. Por favor, intenta nuevamente',
          confirmButtonText:'Aceptar'
        });
        console.error('Error al cargar las categorias: ', error)
      }
    })
  }

  //Hace una peticion al backend eliminando una categoria
  eliminarCategoria(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la categoría permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((resultado) =>{
      if (resultado.isConfirmed){
        this.adminService.eliminarCategoria(id).subscribe({
          next: () => {
            this.cargarCategorias();
            Swal.fire({
              title: '¡Eliminado!',
              text: 'La categoría ha sido eliminada correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'No se pudo eliminar la categoría. Por favor, intenta nuevamente.',
              confirmButtonText: 'Aceptar'
            });
            console.error('Error al eliminar categoría:', error)
          }
        })        
      }
    })
  }

  //Este metodo abre el formulario 
  abrirFormularioCrear(): void{
    this.mostrarFormulario = true;
    this.modoEdicion = false;
    this.categoriaEditando = null;
  }

  //Este metodo acre el formulario en modo edicion
  editarCategoria(categoria: any): void {
    this.mostrarFormulario = true;
    this.modoEdicion = true;
    this.categoriaEditando = { ...categoria };

    // Espera a que el formulario se renderice y luego hace scroll
    setTimeout(() => {
      const formulario = document.getElementById('formulario-categoria');
      if (formulario) {
        formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  //Este metodo recibe los datos del componente de crear categorias
  manejarGuardado(categoria: any): void {
  if (this.modoEdicion) {
    //Actualizar categorias existentes
    this.adminService.actualizarCategoria(
      this.categoriaEditando._id,
      categoria
    ).subscribe({
      next: () => {
        this.cargarCategorias();
        this.cerrarFormulario();
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'La categoría ha sido actualizada correctamente',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: 'No se pudo actualizar la categoría. Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error al actualizar:', error);
      }
    });
  } else {
    // CREAR nueva categoría
    this.adminService.crearCategoria(categoria).subscribe({
      next: () => {
        this.cargarCategorias();
        this.cerrarFormulario();
        Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'La categoría ha sido creada correctamente',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear',
          text: 'No se pudo crear la categoría. Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar'
        });
        console.error('Error al crear:', error);
      }
    });
  }
  }

  //Cerrar formulario
  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.modoEdicion = false;
    this.categoriaEditando = null;
  }

  //Metodo palanca 
  palancaFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if(!this.mostrarFormulario){
      this.cerrarFormulario();
    }
  }
}
