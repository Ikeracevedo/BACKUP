import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactoRoutingModule } from './contacto-routing-module';
import { ContactoPage } from './pages/contacto-page/contacto-page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContactoPage
  ],
  imports: [
    CommonModule,
    ContactoRoutingModule,
    ReactiveFormsModule,
    ContactoRoutingModule
  ]
})
export class ContactoModule { }
