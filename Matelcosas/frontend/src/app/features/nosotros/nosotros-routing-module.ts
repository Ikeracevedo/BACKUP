import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Nosotros } from './pages/nosotros';

const routes: Routes = [
  { path: '', component: Nosotros }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NosotrosRoutingModule { }
