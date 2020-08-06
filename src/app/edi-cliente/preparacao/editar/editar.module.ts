import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditarPageRoutingModule } from './editar-routing.module';
import { EditarPage } from './editar.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPageRoutingModule,
    ReactiveFormsModule, //necessário para funcionar FormGroup
    TranslateModule.forChild()
  ],
  declarations: [EditarPage],
  providers: [  ]

})
export class EditarPageModule {}
