import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfisPage } from './perfis.page';

const routes: Routes = [
  {
    path: '',
    component: PerfisPage
  },
  {
    path: 'editar',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfisPageRoutingModule {}
