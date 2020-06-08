import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfiguracaoPageRoutingModule } from './configuracao-routing.module';
import { ConfiguracaoPage } from './configuracao.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiguracaoPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ConfiguracaoPage]
})
export class ConfiguracaoPageModule {}
