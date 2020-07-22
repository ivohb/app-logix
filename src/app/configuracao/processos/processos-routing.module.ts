import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessosPage } from './processos.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessosPage
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
export class ProcessosPageRoutingModule {}
