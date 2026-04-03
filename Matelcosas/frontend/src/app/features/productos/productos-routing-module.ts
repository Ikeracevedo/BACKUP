import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosListPage } from './pages/productos-list-page/productos-list-page';
import { ProductosDetailPage } from './pages/productos-detail-page/productos-detail-page';


const routes: Routes = [
  { path: '', component: ProductosListPage },
  { path: ':id', component: ProductosDetailPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
