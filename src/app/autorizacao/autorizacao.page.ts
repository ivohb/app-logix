import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppFunction } from '../app.function';
import { EmpresaService } from 'src/services/empresa.service';
import { TranslateService } from '@ngx-translate/core';
import { NavController, MenuController } from '@ionic/angular';
import { EmpresaDto } from 'src/models/empresa.dto';
import { LoadingService } from 'src/services/loading.service';
import { AppFormat } from '../app.format';

@Component({
  selector: 'app-autorizacao',
  templateUrl: './autorizacao.page.html',
  styleUrls: ['./autorizacao.page.scss'],
})
export class AutorizacaoPage implements OnInit {

  fg: FormGroup;
  model: EmpresaDto; 

  constructor(
    private appFunc: AppFunction,
    private formata: AppFormat,
    private service: EmpresaService,
    private formBuilder: FormBuilder,
    private loading: LoadingService,
    private menuCtrl: MenuController  ) { 
      this.menuCtrl.enable(false);

      this.fg = this.formBuilder.group({       
        cnpj:   ['', [Validators.required]],
        chave:  ['', [Validators.required]]
      });
        
  }

  ngOnInit() {  }

  authCompany() {
    this.loading.loadingPresent();  
    this.service.AuthCompany(this.fg.value)
    .subscribe(response => {
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
    },
    error => {
      this.loading.loadingDismiss();
     });
  }      

  format() {
    let val = this.fg.controls.cnpj.value.toString();
    this.fg.controls.cnpj.setValue(this.formata.format(val));
    return;
  };

}
