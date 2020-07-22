import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from 'src/services/loading.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppFunction } from 'src/app/app.function';
import { ProcessoDto } from 'src/models/processo.dto';
import { ProcessoService } from 'src/services/processo.service';
import { ModuloDto } from 'src/models/modulo.dto';
import { ModuloService } from 'src/services/modulo.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  fg: FormGroup;
  model: ProcessoDto;
  desabilita : boolean;
  excluir: boolean;
  loader: any;
  id: string;

  modulos: ModuloDto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loading: LoadingService,
    private service: ProcessoService,
    private moduloService: ModuloService,
    private navCtrl: NavController, 
    private appFunc: AppFunction,
    public route: ActivatedRoute 

  ) {
    this.route.paramMap.subscribe( (params:ParamMap) =>  { 
        this.id = params.get("id")
     })
  }

  ngOnInit() {
    this.fg = this.formBuilder.group({
      id:       ['', []],
      titulo:   ['', [Validators.required, Validators.maxLength(25)]],
      path:     ['', [Validators.required, Validators.maxLength(25)]],
      icone:    ['', [Validators.required, Validators.maxLength(50)]],
      situacao: ['', [Validators.required, Validators.maxLength(1)]],
      modulo:   ['', [Validators.required]]
    })
    this.findAllModulo();
  }

  findAllModulo() {
    this.moduloService.findAll()
    .subscribe(response => {
      this.modulos = response;
    },
    error => {
      console.log(error);
    });
  }

  ionViewWillEnter() {
    if (this.id == '0') {
      this.fg.controls.id.setValue(this.id);
      this.fg.controls.situacao.setValue('I');
      this.desabilita = false;
      this.excluir = false;
    } else {
      this.desabilita = true;
      this.service.findById(this.id) //chamada assincrona da função
      .subscribe(
        response => { //função executa na resposta, se tudo ok
          this.model = response; //captura os usuários
          this.setValues();
        },
        error => {}); //função executada se der erro 
    }    
  
  }

  setValues() {
    this.fg.controls.id.setValue(this.model.id);
    this.fg.controls.titulo.setValue(this.model.titulo);
    this.fg.controls.path.setValue(this.model.path);
    this.fg.controls.icone.setValue(this.model.icone);
    this.fg.controls.situacao.setValue(this.model.situacao);   
    this.fg.controls.modulo.setValue(this.model.modulo);   
    if (this.fg.controls.situacao.value == 'I') {
      this.excluir = true;
    }
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
      this.findIdByUrl(url);
      this.fg.controls.id.setValue(this.id);
      this.excluir = true;
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
    },
    error => {/*Não precisa tratar erros do back end, pois
      já existe um tratamento de erros global na classe error-interceptor.ts */
      this.loading.loadingDismiss();
     });
  }      

  findIdByUrl(url: string) {
    for (let i = url.length; i >=0;  i--) {
      let dig = url.substring(i,i+1)
      if (dig == '/') {
        this.id=url.substring(i+1,url.length);
        return;
      } 
    }    
  }

  update() {
    this.loading.loadingPresent();  
    this.service.update(this.fg.value)
    .subscribe(response => {
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
      if (this.fg.controls.situacao.value != 'I') {
        this.excluir = false;
      }
    },
    error => {
      this.loading.loadingDismiss();
    });    
  }      

  delete() {
    
    if (this.fg.controls.situacao.value == 'I') {
    } else {
      let texto = this.appFunc.getTexto("EXCLUSAO_INVALIDA");
      this.appFunc.presentToast(texto);
      return;
    }

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
