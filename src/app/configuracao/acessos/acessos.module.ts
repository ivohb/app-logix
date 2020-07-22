import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcessosPageRoutingModule } from './acessos-routing.module';

import { AcessosPage } from './acessos.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcessosPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [AcessosPage],
  
  providers: [
  
  ]
})
export class AcessosPageModule { }
