import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Nosotros } from './pages/nosotros';
import { NosotrosRoutingModule } from './nosotros-routing-module';



@NgModule({
  declarations: [
    Nosotros
  ],
  imports: [
    CommonModule,
    NosotrosRoutingModule
  ]
})
export class NosotrosModule { }
