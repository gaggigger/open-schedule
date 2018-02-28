import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageUnavailableComponent }    from './page-unavailable.component';

const routes: Routes = [
  {
    path: 'unavailable',
    component: PageUnavailableComponent
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
export class PageUnavailableRoutingModule { }
