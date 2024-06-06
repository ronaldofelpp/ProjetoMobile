import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SobreAPIPage } from './sobre-api.page';

const routes: Routes = [
  {
    path: '',
    component: SobreAPIPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SobreAPIPageRoutingModule {}
