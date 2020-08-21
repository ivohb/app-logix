import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from 'src/services/loading.service';
import { NavController, AlertController } from '@ionic/angular';
import { AppFunction } from 'src/app/app.function';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClienteItemService } from 'src/services/cliente.item.service';
import { ClienteItemDto } from 'src/models/cliente.item.dto.';
import { EdiClientProgramDto } from 'src/models/edi.client.program.dto';
import { EdiClientProgramService } from 'src/services/edi.client.program.service';
import { StorageService } from 'src/services/storage.service';
import { EdiClienteService } from 'src/services/edi.cliente.service';
import { EdiClienteDto } from 'src/models/edi.cliente.dto';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  fg: FormGroup;
  ecModel: EdiClienteDto;
  ecpModel: EdiClientProgramDto;
  desabilita : boolean;
  excluir: boolean;
  loader: any;
  id: string;
  ediCliente: number;
  empresa: string;
  exibLista: boolean;
  exibCampo: boolean;

  lista: EdiClientProgramDto[] = [];
  popup: ClienteItemDto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loading: LoadingService,
    private ciService: ClienteItemService,
    private ecService: EdiClienteService,
    private ecpService: EdiClientProgramService,
    private navCtrl: NavController, 
    private appFunc: AppFunction,
    public route: ActivatedRoute ,
    private alertCtrl: AlertController,
    private storage: StorageService

  ) {  }

  ngOnInit() {    
    let localUser = this.storage.getLocalUser(); 
    this.empresa = localUser.empresa;
    let localEdi = this.storage.getLocalEdi(); 
    this.id = localEdi.id;
    this.fg = this.formBuilder.group({
      id:       ['', []],
      empresa:  ['', []],
      pedido:   ['', [Validators.required, Validators.maxLength(30)]],
      produto:  ['', [Validators.required, Validators.maxLength(30)]],
      situacao: ['', [Validators.required, Validators.maxLength(1)]]
    })
    this.findByEmpresa();
    if (this.id != '0') {
      this.findByEdiCliente();
    }    
  }

  findByEmpresa() { 
    let localCliente = this.storage.getLocalCliente();
    this.ciService.findByEmpresaAndCliente(this.empresa, localCliente.cliente)
    .subscribe(response => {
      this.popup = response;
    },
    error => {
      console.log(error);
    });
  }

  findByEdiCliente() {
    this.exibLista = true;
    this.ediCliente = Number(this.id);
    this.ecpService.findByEdiCliente(this.ediCliente)
    .subscribe(response => {
      this.lista = response;
    },
    error => {
      console.log(error);
    });
  }

  ionViewWillEnter() {
    if (this.id == '0') {
      this.fg.controls.id.setValue(this.id);
      this.fg.controls.situacao.setValue('E');
      this.fg.controls.empresa.setValue(this.empresa);
      this.desabilita = false;
      this.excluir = false;
    } else {
      this.desabilita = true;
      this.ecService.findById(this.id) //chamada assincrona da função
      .subscribe(
        response => { //função executa na resposta, se tudo ok
          this.ecModel = response; //captura os usuários
          this.setValues();
        },
        error => {}); //função executada se der erro 
    }    
  
  }

  setValues() {
    this.fg.controls.id.setValue(this.ecModel.id);
    this.fg.controls.empresa.setValue(this.ecModel.empresa);
    this.fg.controls.pedido.setValue(this.ecModel.pedido);
    this.fg.controls.produto.setValue(this.ecModel.produto);
    this.fg.controls.situacao.setValue(this.ecModel.situacao);   
    if (this.fg.controls.situacao.value == 'E') {
      this.excluir = true;
    }
  }

  save() { 
    let localUser = this.storage.getLocalUser(); 

    if (this.fg.controls.id.value == 0) {
      this.insert();
    } else {
      this.update();
    } 

  }

  insert() {
    this.loading.loadingPresent();  
    this.ecService.insert(this.fg.value)
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
    this.ecService.update(this.fg.value)
    .subscribe(response => {
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
      if (this.fg.controls.situacao.value != 'E') {
        this.excluir = false;
      }
    },
    error => {
      this.loading.loadingDismiss();
    });    
  }      

  async alertConfirm() {
    const alert = await this.alertCtrl.create({
      header: this.appFunc.getTexto("ALERTA_DEL_CABEC"),
      message: this.appFunc.getTexto("ALERTA_DEL_MENSAGEM"),
      buttons: [
        {
          text: this.appFunc.getTexto("ALERTA_DEL_CANCELA"),
          handler: (blah) => {
          }
        }, {
          text: this.appFunc.getTexto("ALERTA_DEL_CONFIRMA"),
          handler: () => {
            this.delete();
          }
        }
      ]
    });

    await alert.present();
  }

  delete() {
    
    this.loading.loadingPresent();  
    this.ecService.delete(this.fg.controls.id.value)
    .subscribe(response => {
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
      this.ecModel = null;
      this.navCtrl.back();
    },
    error => {
      this.loading.loadingDismiss();
    });        
  }
 
  showObject(id: string) {
    let url = `/edi-cliente/preparacao/editar/programacao/${id}`;
    this.navCtrl.navigateBack(url);

  }  

  addObject() {
    this.navCtrl.navigateBack('/edi-cliente/preparacao/editar/programacao/0'); 
  }

}
