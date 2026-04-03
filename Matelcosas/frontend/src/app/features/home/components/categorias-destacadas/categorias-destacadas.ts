import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { enviroment } from '../../../../../environments/enviroment';
import { Categoria } from '../../../categorias/data/categoria.model';
import { Categorias } from '../../../categorias/data/categorias';
import { ChangeDetectorRef } from '@angular/core';

type categoria = { _id: string; nombre: string; imagen?: string; estado?: string}

@Component({
  selector: 'app-categorias-destacadas',
  templateUrl: './categorias-destacadas.html',
  styleUrls: ['./categorias-destacadas.scss'],
    standalone: false
})

export class CategoriasDestacadas implements OnInit {
  
  apiUrl = enviroment.apiUrl;
  
  categorias: any[] = [];

  loading = true;
  error = false;

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 2500,
    dots: false,
    nav: true,
    navText: ['‹', '›'],
    responsive: {
      0: { items: 2 },
      600: { items: 3 },
      900: { items: 4 },
      1200: { items: 6 }
    }
  };

  constructor(private categoriaService: Categorias, private http: HttpClient, private cdr: ChangeDetectorRef ) {}

    ngOnInit(): void {
    this.categoriaService.obtenerCategoriasActivas().subscribe({
      next: (cats) => {
        console.log('📦 Categorías recibidas:', cats);
        this.categorias = cats ?? [];
        this.loading = false;

        // 🔧 Forzar actualización del carrusel
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Error al cargar categorías:', err);
        this.error = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getImagenUrl(categoria: any): string {
  if (!categoria?.imagen) {
    return 'assets/img/placeholder-cat.png';
  }

  // Si ya viene completa, la devolvemos
  if (categoria.imagen.startsWith('http')) {
    return categoria.imagen;
  }

  // Si empieza con /uploads, añadimos el host
  return `http://localhost:5000${categoria.imagen}`;
}

  imageUrl(cat: any): string {
    if (!cat?.imagen) return 'assets/img/placeholder-cat.png';
    if (cat.imagen.startsWith('/uploads')) {
      return `http://localhost:5000${cat.imagen}`;
    }
    return cat.imagen;
  }


  onImgError(ev: Event) {
    (ev.target as HTMLImageElement).src = 'assets/img/placeholder-cat.png';
  }

  ngAfterViewInit() {
    const container = document.querySelector('.carousel') as HTMLElement;
    if (container) {
      let scrollAmount = 0;
      const step = 2; // velocidad de desplazamiento
      const interval = setInterval(() => {
        container.scrollLeft += step;
        scrollAmount += step;
        // Reinicia al llegar al final
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) {
          container.scrollLeft = 0;
        }
      }, 30); // milisegundos → más bajo = más rápido
    }
  }


}
