import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing-module';
import { HomePage } from './pages/home-page/home-page';
import { Banner } from './components/banner/banner';
import { CategoriasDestacadas } from './components/categorias-destacadas/categorias-destacadas';


import { CountUpModule } from 'ngx-countup';

@NgModule({
  declarations: [
    HomePage,
    Banner,
    CategoriasDestacadas,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CountUpModule, // 👈 debe estar aquí
  ],
})
export class HomeModule {}
