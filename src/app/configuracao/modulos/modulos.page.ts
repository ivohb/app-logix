import { Component, OnInit } from '@angular/core';
import { ModuloDto } from 'src/models/modulo.dto';
import { LoadingService } from 'src/services/loading.service';
import { ModuloService } from 'src/services/modulo.service';
import { AppFunction } from 'src/app/app.function';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.page.html',
  styleUrls: ['./modulos.page.scss'],
})
export class ModulosPage implements OnInit {

  modulos : ModuloDto[] = [];  
  numberPage: number = 0;
  totalPage: number = 0;
  totalElement: number = 0;
  searchkey: string = '';

  constructor(  
    private loading: LoadingService,
    private moduloService: ModuloService,
    private appFunc: AppFunction,
    private navCtrl: NavController
  ) {   }

  ngOnInit() {  }

  ionViewWillEnter() {
    this.numberPage = 0;
    this.modulos = [];
    this.loadData();
  }

  loadData() {
    this.loading.loadingPresent();
    this.moduloService.findPage(this.numberPage, 10) 
      .subscribe(response => { //função executa na resposta, se tudo ok
          this.totalPage = response['totalPages']; 
          this.totalElement = response['totalElements'];
          this.modulos = this.modulos.concat(response['content']); 
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
    this.navCtrl.navigateBack('/configuracao/modulos/pesquisar');
  }

  addObject() {
    this.navCtrl.navigateBack('/configuracao/modulos/editar/0'); 
  }

  showObject(id: string) {
    let url = `/configuracao/modulos/editar/${id}`;
    this.navCtrl.navigateBack(url);
  }


}
