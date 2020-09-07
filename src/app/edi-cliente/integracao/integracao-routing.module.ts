import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntegracaoPage } from './integracao.page';

const routes: Routes = [
  {
    path: '',
    component: IntegracaoPage
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
export class IntegracaoPageRoutingModule {}
