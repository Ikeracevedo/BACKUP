import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule) },
      { path: 'categorias', loadChildren: () => import('./features/categorias/categorias-module').then(m => m.CategoriasModule) },
      { path: 'productos', loadChildren: () => import('./features/productos/productos-module').then(m => m.ProductosModule) },
      { path: 'contacto', loadChildren: () => import('./features/contacto/contacto-module').then(m => m.ContactoModule) },
      { path: 'nosotros', loadChildren: () => import('./features/nosotros/nosotros-module').then(m => m.NosotrosModule) },
    ],
  },
  {
    path: 'admin',
    loadComponent: () => import('./layouts/admin-layout/admin-layout').then(m => m.AdminLayout),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule)
      }
    ]
},

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
