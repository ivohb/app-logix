import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesquisarPageRoutingModule } from './pesquisar-routing.module';

import { PesquisarPage } from './pesquisar.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesquisarPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [PesquisarPage]
})
export class PesquisarPageModule {

}
