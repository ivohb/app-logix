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
    path: 'configuracao/:modulo/usuarios',
    loadChildren: () => import('./configuracao/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'configuracao/usuarios/editar/:id',
    loadChildren: () => import('./configuracao/usuarios/usuario/usuario.module').then( m => m.UsuarioPageModule)
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
    path: 'edi-kanban/:modulo',
    loadChildren: () => import('./edi-kanban/edi-kanban.module').then( m => m.EdiKanbanPageModule)
  },
  {
    path: 'documentacao',
    loadChildren: () => import('./documentacao/documentacao.module').then( m => m.DocumentacaoPageModule)
  },
  {
    path: 'inventario/:modulo',
    loadChildren: () => import('./inventario/inventario.module').then( m => m.InventarioPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
