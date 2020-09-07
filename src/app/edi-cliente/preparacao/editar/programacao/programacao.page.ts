import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/services/loading.service';
import { AppFunction } from 'src/app/app.function';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EdiClientProgramDto } from 'src/models/edi.client.program.dto';
import { EdiClientProgramService } from 'src/services/edi.client.program.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-programacao',
  templateUrl: './programacao.page.html',
  styleUrls: ['./programacao.page.scss'],
})
export class ProgramacaoPage implements OnInit {

  id: string;
  ediCliente: string;
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
    private service: EdiClientProgramService,
    private storage: StorageService
    
  ) {
    this.route.paramMap.subscribe( (params:ParamMap) =>  { 
        this.id = params.get("id");
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
      let localEdi = this.storage.getLocalEdi(); 
      let ediCliente = localEdi.id;  
      this.fg.controls.ediCliente.setValue(ediCliente);
      this.fg.controls.tipo.setValue('');
      this.fg.controls.quantidade.setValue(null);
      this.excluir = false;
    } else {
      this.desabilita = true;
      this.excluir = true;
      this.service.findById(this.id) 
      .subscribe(
        response => { 
          this.model = response; 
          console.log(this.model);
          this.setValues();
        },
        error => {});
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
      this.insert();
    } else {
      this.update();
    } 
  }

  insert() {
    this.loading.loadingPresent();  
    this.service.insert(this.fg.value)
    .subscribe(response => {
      let url =  response.headers.get('Location');
      this.id = this.appFunc.getIdByUrl(url);
      this.fg.controls.id.setValue(this.id);
      this.excluir = true;
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
    },
    error => {
      this.loading.loadingDismiss();
     });
  }      

  update() {
    this.loading.loadingPresent();  
    this.service.update(this.fg.value)
    .subscribe(response => {
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
    },
    error => {
      this.loading.loadingDismiss();
    });    
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

  addObject() {
    this.id = '0';
    this.ionViewWillEnter();
  }

}
