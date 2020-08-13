import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/services/loading.service';
import { AppFunction } from 'src/app/app.function';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EdiClientProgramDto } from 'src/models/edi.client.program.dto';
import { EdiClientProgramService } from 'src/services/edi.client.program.service';

@Component({
  selector: 'app-programacao',
  templateUrl: './programacao.page.html',
  styleUrls: ['./programacao.page.scss'],
})
export class ProgramacaoPage implements OnInit {

  id: string;
  fg: FormGroup;
  model: EdiClientProgramDto;
  desabilita : boolean;
  excluir: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loading: LoadingService,
    private navCtrl: NavController, 
    private appFunc: AppFunction,
    public route: ActivatedRoute ,
    private service: EdiClientProgramService

  ) {
    this.route.paramMap.subscribe( (params:ParamMap) =>  { 
        this.id = params.get("id")
     })
  }
  ngOnInit() {
    this.fg = this.formBuilder.group({
      id:          ['', []],
      ediCliente:  ['', []],
      data:        ['', []],
      quantidade:  ['', [Validators.required]],
      tipo:        ['', [Validators.required]]
    })
  }

  ionViewWillEnter() {
    if (this.id == '0') {
      this.fg.controls.id.setValue(this.id);
      this.desabilita = false;
      this.excluir = false;
    } else {
      this.desabilita = true;
      this.excluir = true;
      this.service.findById(this.id) //chamada assincrona da função
      .subscribe(
        response => { //função executa na resposta, se tudo ok
          this.model = response; //captura os usuários
          console.log(this.model);
          this.setValues();
        },
        error => {}); //função executada se der erro 
    }    
  
  }

  setValues() {
    this.fg.controls.id.setValue(this.model.id);
    this.fg.controls.ediCliente.setValue(this.model.ediCliente);
    this.fg.controls.data.setValue(this.model.data);
    this.fg.controls.quantidade.setValue(this.model.quantidade);
    this.fg.controls.tipo.setValue(this.model.tipo);
  }

  save() { 
    if (this.fg.controls.id.value == 0) {
      //this.insert();
    } else {
      //this.update();
    } 

    console.log(this.fg.value);

  }

  delete() {
    
    this.loading.loadingPresent();  
    this.service.delete(this.fg.controls.id.value)
    .subscribe(response => {
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
      this.model = null;
      this.navCtrl.back();
    },
    error => {
      this.loading.loadingDismiss();
    });        
  }

}
