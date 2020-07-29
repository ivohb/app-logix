import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreparacaoPageRoutingModule } from './preparacao-routing.module';

import { PreparacaoPage } from './preparacao.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreparacaoPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [PreparacaoPage]
})
export class PreparacaoPageModule { }
