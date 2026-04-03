import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Loader } from './components/loader/loader';
import { AdminRoutingModule } from "../features/admin/admin-routing-module";
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Navbar,
    Footer,
    Loader
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule
],
  exports: [
    Navbar,
    Footer,
    Loader
  ]
})
export class SharedModule { }
