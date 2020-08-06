import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreparacaoPage } from './preparacao.page';

const routes: Routes = [
  {
    path: '',
    component: PreparacaoPage
  },
  {
    path: 'editar',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'pesquisar',
    loadChildren: () => import('./pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreparacaoPageRoutingModule {}
