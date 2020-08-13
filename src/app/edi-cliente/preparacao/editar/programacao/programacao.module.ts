import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramacaoPageRoutingModule } from './programacao-routing.module';

import { ProgramacaoPage } from './programacao.page';
import { TranslateModule } from '@ngx-translate/core';
import { EdiClientProgramService } from 'src/services/edi.client.program.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramacaoPageRoutingModule,
    ReactiveFormsModule, //necessário para funcionar FormGroup
    TranslateModule.forChild()
  ],
  declarations: [ProgramacaoPage],
  providers: [ EdiClientProgramService ]

})
export class ProgramacaoPageModule {}
