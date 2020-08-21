import { Component, OnInit } from '@angular/core';
import { EdiClienteDto } from 'src/models/edi.cliente.dto';
import { LoadingService } from 'src/services/loading.service';
import { EdiClienteService } from 'src/services/edi.cliente.service';
import { AppFunction } from 'src/app/app.function';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-preparacao',
  templateUrl: './preparacao.page.html',
  styleUrls: ['./preparacao.page.scss'],
})
export class PreparacaoPage implements OnInit {

  lista : EdiClienteDto[] = [];  
  numberPage: number = 0;
  totalPage: number = 0;
  totalElement: number = 0;
  searchkey: string = '';

  constructor(  
    private loading: LoadingService,
    private service: EdiClienteService,
    private appFunc: AppFunction,
    private navCtrl: NavController,
    private storage: StorageService
  ) {   }

  ngOnInit() {
    let localCliente = this.storage.getLocalCliente(); 
    if (localCliente.cliente.length == 0) {
      let texto = this.appFunc.getTexto("OPCAO_CLIENTE");
      this.appFunc.mensagem(this.appFunc.getTexto('NAO_AUTORIZADO'), texto);
      this.navCtrl.navigateBack('/edi-cliente/:modulo');
    } else {
      this.loadPrepar();  
    }    
  }
 
  loadPrepar() {
    let localUser = this.storage.getLocalUser(); 
    this.service.findByEmpresaAndSituacao(localUser.empresa,'E')
    .subscribe(
      response => { 
        this.lista = response; 
      },
      error => { 
        this.lista = [];
      }); 
  }

  find() { 
    this.navCtrl.navigateBack('/edi-cliente/preparacao/pesquisar');
  }

  addObject() {
    this.service.setLocalStorage('0');
    this.navCtrl.navigateBack('/edi-cliente/preparacao/editar/0'); 
  }

  showObject(id: string) {
    this.service.setLocalStorage(id);
    let url = `/edi-cliente/preparacao/editar/${id}`;
    this.navCtrl.navigateBack(url);
  }


}
