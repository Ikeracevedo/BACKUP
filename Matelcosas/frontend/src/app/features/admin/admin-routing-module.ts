import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { AdminCategorias } from './admin-categorias/admin-categorias';
import { AdminProductos } from './admin-productos/admin-productos';
import { AdminContactos } from './admin-contactos/admin-contactos';
import { SubirImagen } from './components/subir-imagen/subir-imagen';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboard },
  { path: 'categorias', component: AdminCategorias },
  { path: 'categorias/subir-imagen/:id', component: SubirImagen },
  { path: 'productos', component: AdminProductos },
  { path: 'contactos', component: AdminContactos },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}