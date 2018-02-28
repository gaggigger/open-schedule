import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageGeneralErrorComponent }    from './page-general-error.component';

const routes: Routes = [
  {
    path: 'general-error',
    component: PageGeneralErrorComponent
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
export class PageGeneralErrorRoutingModule { }
