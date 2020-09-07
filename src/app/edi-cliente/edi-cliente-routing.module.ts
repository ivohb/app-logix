import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdiClientePage } from './edi-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: EdiClientePage
  },
  {
    path: 'preparacao',
    loadChildren: () => import('./preparacao/preparacao.module').then( m => m.PreparacaoPageModule)
  },
  {
    path: 'integracao',
    loadChildren: () => import('./integracao/integracao.module').then( m => m.IntegracaoPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdiClientePageRoutingModule {}
