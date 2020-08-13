import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPage } from './editar.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPage
  },
  { 
    path: 'programacao',
    loadChildren: () => import('./programacao/programacao.module').then( m => m.ProgramacaoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPageRoutingModule {}
