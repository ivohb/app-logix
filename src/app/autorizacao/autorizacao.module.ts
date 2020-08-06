import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutorizacaoPageRoutingModule } from './autorizacao-routing.module';

import { AutorizacaoPage } from './autorizacao.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutorizacaoPageRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule //necessários para validação de formilário
  ],
  declarations: [AutorizacaoPage]
})
export class AutorizacaoPageModule {}
