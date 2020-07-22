import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfisPageRoutingModule } from './perfis-routing.module';

import { PerfisPage } from './perfis.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfisPageRoutingModule,
    TranslateModule.forChild()

  ],
  declarations: [PerfisPage]
})
export class PerfisPageModule {}
