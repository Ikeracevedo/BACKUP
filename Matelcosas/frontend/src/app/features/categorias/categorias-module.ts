import { NgModule } from '@angular/core';
import { CategoriasRoutingModule } from './categorias-routing-module';
import { CategoriasPage } from './pages/categorias-page/categorias-page';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    CategoriasPage,
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    CardModule,
    SkeletonModule,
    ButtonModule,
    RippleModule
  ]
})
export class CategoriasModule { }
