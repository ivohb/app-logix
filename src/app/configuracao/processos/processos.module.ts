import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessosPageRoutingModule } from './processos-routing.module';

import { ProcessosPage } from './processos.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcessosPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ProcessosPage]
})
export class ProcessosPageModule {}
