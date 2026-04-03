import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing-module';
import { ProductosListPage } from './pages/productos-list-page/productos-list-page';
import { ProductosDetailPage } from './pages/productos-detail-page/productos-detail-page';
import { ProductCard } from './components/product-card/product-card';


@NgModule({
  declarations: [
    ProductosListPage,
    ProductosDetailPage,
    ProductCard
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
