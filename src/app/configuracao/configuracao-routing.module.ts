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
  },
  {
    path: 'processos',
    loadChildren: () => import('./processos/processos.module').then( m => m.ProcessosPageModule)
  },
  {
    path: 'perfis',
    loadChildren: () => import('./perfis/perfis.module').then( m => m.PerfisPageModule)
  },
  {
    path: 'acessos',
    loadChildren: () => import('./acessos/acessos.module').then( m => m.AcessosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracaoPageRoutingModule {}
