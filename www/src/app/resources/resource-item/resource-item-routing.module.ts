import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourceItemComponent }    from './resource-item.component';

const routes: Routes = [
  {
    path: 'resources/:item',
    component: ResourceItemComponent
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
export class ResourceItemRoutingModule { }
