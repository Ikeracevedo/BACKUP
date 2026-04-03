import { Injectable } from '@angular/core';
import { enviroment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs/internal/Observable';
import { Producto } from './productos.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = `${enviroment.apiUrl}/productos`

  constructor(private http: HttpClient) {}

  obtenerTodosLosProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  obtenerProductoPorId(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  
  }


}
