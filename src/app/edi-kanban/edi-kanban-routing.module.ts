import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdiKanbanPage } from './edi-kanban.page';

const routes: Routes = [
  {
    path: '',
    component: EdiKanbanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdiKanbanPageRoutingModule {}
