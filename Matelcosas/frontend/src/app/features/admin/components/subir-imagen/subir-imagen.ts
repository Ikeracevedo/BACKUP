import { Component } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.html',
  styleUrls: ['./subir-imagen.scss'],
  standalone: false
})
export class SubirImagen {
  categoriaId: string = '';
  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;
  uploadProgress: number = 0;
  message: string = '';
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.paramMap.get('id') || '';
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.message = '';
    this.preview = null;

    if (this.selectedFile) {
      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(this.selectedFile.type)) {
        Swal.fire({
          icon: 'warning',
          title: 'Formato no válido',
          text: 'Por favor selecciona una imagen válida (JPG, PNG, GIF o WEBP)',
          confirmButtonColor: '#3085d6'
        });
        this.selectedFile = null;
        return;
      }

      // Validar tamaño (ejemplo: máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (this.selectedFile.size > maxSize) {
        Swal.fire({
          icon: 'warning',
          title: 'Archivo muy grande',
          text: 'La imagen no debe superar los 5MB',
          confirmButtonColor: '#3085d6'
        });
        this.selectedFile = null;
        return;
      }

      const reader = new FileReader();
      reader.onload = e => (this.preview = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin imagen',
        text: 'Selecciona una imagen antes de subir',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    const formData = new FormData();
    formData.append('imagen', this.selectedFile);

    this.loading = true;
    this.uploadProgress = 0;

    // Mostrar alerta de progreso
    Swal.fire({
      title: 'Subiendo imagen...',
      html: 'Progreso: <b>0%</b>',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.http.post(`http://localhost:5000/api/categorias/${this.categoriaId}/imagen`, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
          
          // Actualizar progreso en la alerta
          const progressHtml = `Progreso: <b>${this.uploadProgress}%</b>`;
          Swal.update({
            html: progressHtml
          });
        } else if (event.type === HttpEventType.Response) {
          this.loading = false;
          
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: event.body.message || 'Imagen subida correctamente',
            confirmButtonColor: '#28a745',
            timer: 2000,
            showConfirmButton: true
          }).then(() => {
            // Opcional: redirigir después del éxito
            // this.router.navigate(['/admin/categorias']);
          });

          // Limpiar formulario
          this.selectedFile = null;
          this.preview = null;
          this.uploadProgress = 0;
        }
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        
        Swal.fire({
          icon: 'error',
          title: 'Error al subir',
          text: err.error?.message || 'Ocurrió un error al subir la imagen. Intenta nuevamente.',
          confirmButtonColor: '#dc3545',
          footer: err.status ? `Código de error: ${err.status}` : ''
        });

        this.uploadProgress = 0;
      }
    });
  }

  volver() {
    // Confirmar antes de volver si hay una imagen seleccionada
    if (this.selectedFile && !this.loading) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Tienes una imagen seleccionada que no has subido',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, volver',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/admin/categorias']);
        }
      });
    } else {
      this.router.navigate(['/admin/categorias']);
    }
  }
}