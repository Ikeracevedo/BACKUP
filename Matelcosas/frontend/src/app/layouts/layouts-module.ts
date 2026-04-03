import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PublicLayout } from './public-layout/public-layout';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  declarations: [
    PublicLayout, 
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    PublicLayout 
  ]
})
export class LayoutsModule {}
