import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguracaoPage } from './configuracao.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracaoPage
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'modulos',
    loadChildren: () => import('./modulos/modulos.module').then( m => m.ModulosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracaoPageRoutingModule {}
