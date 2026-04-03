import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoPage } from './pages/contacto-page/contacto-page';

const routes: Routes = [
  { path: '', component: ContactoPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactoRoutingModule { }
