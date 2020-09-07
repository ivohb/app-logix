import { Component, OnInit } from '@angular/core';
import { EdiClienteDto } from 'src/models/edi.cliente.dto';
import { EdiClienteService } from 'src/services/edi.cliente.service';
import { AppFunction } from 'src/app/app.function';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-integracao',
  templateUrl: './integracao.page.html',
  styleUrls: ['./integracao.page.scss'],
})
export class IntegracaoPage implements OnInit {

  lista : EdiClienteDto[] = [];  
  
  constructor(  
    private service: EdiClienteService,
    private appFunc: AppFunction,
    private navCtrl: NavController,
    private storage: StorageService
  ) {  }

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
    this.service.findByEmpresaAndSituacao(localUser.empresa,'C')
    .subscribe(
      response => { 
        this.lista = response; 
      },
      error => { 
        this.lista = [];
      }); 
  }

  showObject(id: string) {
    this.service.setLocalStorage(id);
    let url = `/edi-cliente/integracao/editar/${id}`;
    this.navCtrl.navigateBack(url);
  }

}
