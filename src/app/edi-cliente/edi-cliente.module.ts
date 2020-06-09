import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EdiClientePageRoutingModule } from './edi-cliente-routing.module';
import { EdiClientePage } from './edi-cliente.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdiClientePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [EdiClientePage]
})
export class EdiClientePageModule {}
