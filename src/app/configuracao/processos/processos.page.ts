import { Component, OnInit } from '@angular/core';
import { ProcessoDto } from 'src/models/processo.dto';
import { LoadingService } from 'src/services/loading.service';
import { AppFunction } from 'src/app/app.function';
import { NavController } from '@ionic/angular';
import { ProcessoService } from 'src/services/processo.service';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.page.html',
  styleUrls: ['./processos.page.scss'],
})
export class ProcessosPage implements OnInit {

  processos : ProcessoDto[] = [];  
  numberPage: number = 0;
  totalPage: number = 0;
  totalElement: number = 0;
  searchkey: string = '';

  constructor(  
    private loading: LoadingService,
    private service: ProcessoService,
    private appFunc: AppFunction,
    private navCtrl: NavController
  ) {   }

  ngOnInit() {  }

  ionViewWillEnter() {
    this.numberPage = 0;
    this.processos = [];
    this.loadData();
  }

  loadData() {
    this.loading.loadingPresent();
    this.service.findPage(this.numberPage, 10) 
      .subscribe(response => { //função executa na resposta, se tudo ok
          this.totalPage = response['totalPages']; 
          this.totalElement = response['totalElements'];
          this.processos = this.processos.concat(response['content']); 
          this.loading.loadingDismiss();
          if (this.totalElement == 0) {
            let texto = this.appFunc.getTexto("DADOS_NAO_ENCONTRADO");
            this.appFunc.presentToast(texto);
          }
      },
      error => {
        this.loading.loadingDismiss();
      }); //função executada se der erro (nada faz por enquanto)

  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  doInfinite(event) {
    setTimeout(() => {
      event.target.complete();
      this.numberPage++;  
      if (this.numberPage < this.totalPage) {
        this.loadData();
      } else {
        event.target.disabled = true;
      }
    }, 500);
  }

  find() { 
    this.navCtrl.navigateBack('/configuracao/processos/pesquisar');
  }

  addObject() {
    this.navCtrl.navigateBack('/configuracao/processos/editar/0'); 
  }

  showObject(id: string) {
    let url = `/configuracao/processos/editar/${id}`;
    this.navCtrl.navigateBack(url);
  }

}
