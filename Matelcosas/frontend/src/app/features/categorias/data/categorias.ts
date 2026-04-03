import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root',
})

export class Categorias {
  private apiUrl = `${enviroment.apiUrl}/categorias`;

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.apiUrl);
  }
  obtenerPorId(id: string): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }
  crear(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }
  actualizar(id: string, categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }
  eliminar(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  obtenerCategoriasActivas(): Observable<any[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/activas`);
  }

  subirImagenCategoria(id: string, file: File): Observable<any> {
    const form = new FormData();
    form.append('imagen', file);
    return this.http.post(`${this.apiUrl}/${id}/imagen`, form);
  }

  buildImageUrl(relativeOrAbsolute?: string): string {
    if (!relativeOrAbsolute) return 'assets/img/placeholder-cat.png';
    // Si ya viene absoluta, devuélvela
    if (/^https?:\/\//i.test(relativeOrAbsolute)) return relativeOrAbsolute;
    // Si viene con "/uploads/..." la convertimos a absoluta
    if (relativeOrAbsolute.startsWith('/')) {
      return `${this.apiUrl}${relativeOrAbsolute}`;
    }
    // Fallback
    return `${this.apiUrl}/${relativeOrAbsolute}`;
  }
}
