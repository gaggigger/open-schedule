import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageForbiddenComponent }    from './page-forbidden.component';

const routes: Routes = [
  {
    path: 'forbidden',
    component: PageForbiddenComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PageForbiddenRoutingModule { }
