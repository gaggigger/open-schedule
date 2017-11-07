import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreditComponent }    from './credit.component';

const homeRoutes: Routes = [
  {
    path: 'credit',
    component: CreditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CreditRoutingModule { }
