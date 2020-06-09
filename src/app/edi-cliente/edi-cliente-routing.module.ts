import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdiClientePage } from './edi-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: EdiClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdiClientePageRoutingModule {}
