import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DocumentacaoPageRoutingModule } from './documentacao-routing.module';
import { DocumentacaoPage } from './documentacao.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentacaoPageRoutingModule,
    TranslateModule.forChild() 
  ],
  declarations: [DocumentacaoPage]
})
export class DocumentacaoPageModule {}
