import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModulosPage } from './modulos.page';

const routes: Routes = [
  {
    path: '',
    component: ModulosPage
  },
  {
    path: 'pesquisar',
    loadChildren: () => import('./pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
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
export class ModulosPageRoutingModule {}
