import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EdiKanbanPageRoutingModule } from './edi-kanban-routing.module';
import { EdiKanbanPage } from './edi-kanban.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdiKanbanPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [EdiKanbanPage]
})
export class EdiKanbanPageModule {}
