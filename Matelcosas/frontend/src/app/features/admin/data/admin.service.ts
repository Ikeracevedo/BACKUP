import { Injectable } from '@angular/core';
import { enviroment } from '../../../../environments/enviroment';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = `${enviroment.apiUrl}`;


  constructor(private http: HttpClient){}

  //Categorias
  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categorias`);
  }

  crearCategoria(categoria: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categorias`, categoria);
  }
  actualizarCategoria(id: string, categoria: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/categorias/${id}`, categoria);
  }

  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categorias/${id}`);
  }

  //Productos
  obtenerProductos(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/productos`);

  }

  crearProducto(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/productos`, data);
  }

  actualizarProducto(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/productos/${id}`, data);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/productos/${id}`);
  }

  //Contactos
  obtenerContactos(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/contacto`);
  }

  eliminarContactos(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contacto/${id}`);
  }

  actualizarEstadoContacto(id: string, nuevoEstado: boolean): Observable<any> {
  return this.http.put(`${this.baseUrl}/contacto/${id}/estado`, { estado: nuevoEstado });
}

  //Dashboard
  obtenerDashboard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }

  obtenerResumen(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/resumen`);
  }



}
