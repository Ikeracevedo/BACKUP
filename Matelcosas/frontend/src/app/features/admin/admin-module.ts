import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing-module';
import { AdminContactos } from './admin-contactos/admin-contactos';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminProductos } from './admin-productos/admin-productos';
import { AdminCategorias } from './admin-categorias/admin-categorias';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubirImagen } from './components/subir-imagen/subir-imagen';
import { RouterModule } from '@angular/router';
import { CrearCategoria } from './components/crear-categoria/crear-categoria';
import { CrearProducto } from './components/crear-producto/crear-producto';


@NgModule({
  declarations: [
    AdminContactos,
    AdminProductos,
    AdminCategorias,
    AdminDashboard,
    SubirImagen,
    CrearCategoria,
    CrearProducto
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule  
  ]
})

export class AdminModule { }
