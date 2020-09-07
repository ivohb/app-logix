import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntegracaoPageRoutingModule } from './integracao-routing.module';

import { IntegracaoPage } from './integracao.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntegracaoPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [IntegracaoPage]
})
export class IntegracaoPageModule {}
