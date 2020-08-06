import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'autorizacao',
    loadChildren: () => import('./autorizacao/autorizacao.module').then( m => m.AutorizacaoPageModule)
  },
  {
    path: 'documentacao',
    loadChildren: () => import('./documentacao/documentacao.module').then( m => m.DocumentacaoPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'senha',
    loadChildren: () => import('./senha/senha.module').then( m => m.SenhaPageModule)
  },  
  {
    path: 'configuracao/:modulo', 
    loadChildren: () => import('./configuracao/configuracao.module').then( m => m.ConfiguracaoPageModule)
  },   
  {
    path: 'configuracao/acessos/editar/:id',
    loadChildren: () => import('./configuracao/acessos/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'configuracao/acessos/pesquisar',
    loadChildren: () => import('./configuracao/acessos/pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
  },  
  {
    path: 'configuracao/:modulo/modulos', 
    loadChildren: () => import('./configuracao/modulos/modulos.module').then( m => m.ModulosPageModule)
  },
  {
    path: 'configuracao/modulos/pesquisar',
    loadChildren: () => import('./configuracao/modulos/pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
  },
  {
    path: 'configuracao/modulos/editar/:id',
    loadChildren: () => import('./configuracao/modulos/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'configuracao/:modulo/perfis',
    loadChildren: () => import('./configuracao/perfis/perfis.module').then( m => m.PerfisPageModule)
  },
  {
    path: 'configuracao/perfis/editar/:id',
    loadChildren: () => import('./configuracao/perfis/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'configuracao/:modulo/processos',
    loadChildren: () => import('./configuracao/processos/processos.module').then( m => m.ProcessosPageModule)
  },
  {
    path: 'configuracao/processos/pesquisar',
    loadChildren: () => import('./configuracao/processos/pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
  },
  {
    path: 'configuracao/processos/editar/:id',
    loadChildren: () => import('./configuracao/processos/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'configuracao/:modulo/usuarios',
    loadChildren: () => import('./configuracao/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'configuracao/usuarios/editar/:id',
    loadChildren: () => import('./configuracao/usuarios/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'configuracao/usuarios/pesquisar',
    loadChildren: () => import('./configuracao/usuarios/pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
  },

  {
    path: 'edi-cliente/:modulo',
    loadChildren: () => import('./edi-cliente/edi-cliente.module').then( m => m.EdiClientePageModule)
  },
  {
    path: 'edi-cliente/:modulo/edi-cliente-preparar',
    loadChildren: () => import('./edi-cliente/preparacao/preparacao.module').then( m => m.PreparacaoPageModule)
  },
  {
    path: 'edi-cliente/preparacao/pesquisar',
    loadChildren: () => import('./edi-cliente/preparacao/pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
  },
  {
    path: 'edi-cliente/preparacao/editar/:id',
    loadChildren: () => import('./edi-cliente/preparacao/editar/editar.module').then( m => m.EditarPageModule)
  },


  {
    path: 'edi-kanban/:modulo',
    loadChildren: () => import('./edi-kanban/edi-kanban.module').then( m => m.EdiKanbanPageModule)
  },
  {
    path: 'inventario/:modulo',
    loadChildren: () => import('./inventario/inventario.module').then( m => m.InventarioPageModule)
  },
  {
    path: 'autorizacao',
    loadChildren: () => import('./autorizacao/autorizacao.module').then( m => m.AutorizacaoPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
