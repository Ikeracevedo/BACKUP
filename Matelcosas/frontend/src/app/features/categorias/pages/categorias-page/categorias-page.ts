import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../../data/categoria.model';
import { Categorias } from '../../data/categorias';
import { enviroment } from '../../../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-categorias-page',
  templateUrl: './categorias-page.html',
  styleUrl: './categorias-page.scss',
  standalone: false
})
export class CategoriasPage implements OnInit {
  categorias: Categoria[] = [];
  cargando = true;
  apiUrl = enviroment.apiUrl;


  constructor(
    private categoriaService: Categorias,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    // Solo cargamos las categorias activas una vez
    this.categoriaService.obtenerCategoriasActivas().subscribe({
      next: (res) => {
        this.categorias = res;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar categorias', err);
        this.cargando = false;
      }
    });
  }

  imageUrl(categoria: any): string {
    if (!categoria?.imagen) {
      return 'assets/img/placeholder-cat.png'; // Asegúrate de tener un img por defecto si quieres
    }

    if (categoria.imagen.startsWith('http')) {
      return categoria.imagen;
    }

    return `${this.apiUrl}${categoria.imagen}`;
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/300x300?text=Sin+Imagen'; // Fallback genérico
  }

  navegarACategoria(categoria: Categoria) {
    if (categoria._id) {
      this.router.navigate(['/productos'], { queryParams: { categoria: categoria._id } });
    }
  }
} 
