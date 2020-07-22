import { Component, OnInit } from '@angular/core';
import { PerfilDto } from 'src/models/perfil.dto';
import { LoadingService } from 'src/services/loading.service';
import { PerfilService } from 'src/services/perfil.service';
import { AppFunction } from 'src/app/app.function';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.page.html',
  styleUrls: ['./perfis.page.scss'],
})
export class PerfisPage implements OnInit {

  perfis : PerfilDto[] = [];  
  numberPage: number = 0;
  totalPage: number = 0;
  totalElement: number = 0;
  searchkey: string = "";
  
  constructor( 
    private loading: LoadingService,
    private service: PerfilService,
    private appFunc: AppFunction,
    private navCtrl: NavController
  ) {   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.numberPage = 0;
    this.perfis = [];
    this.loadData();
  }

  loadData() {
    this.loading.loadingPresent();
    this.service.findPage(this.numberPage, 10, this.searchkey) 
      .subscribe(response => { 
        this.totalPage = response['totalPages']; 
        this.totalElement = response['totalElements'];
        this.perfis = this.perfis.concat(response['content']); 
        this.loading.loadingDismiss();
        if (this.totalElement == 0) {
          let texto = this.appFunc.getTexto("DADOS_NAO_ENCONTRADO");
          this.appFunc.presentToast(texto);
        }
    },
      error => {
        this.loading.loadingDismiss();
      }); 

  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
  
  find() { 
    this.ionViewWillEnter();
  }

  addObject() {
    this.navCtrl.navigateBack('/configuracao/perfis/editar/0');
  }

  showObject(id: string) {
    let url = `/configuracao/perfis/editar/${id}`;
    this.navCtrl.navigateBack(url);
  }
    
  doInfinite(event) {
    setTimeout(() => {
      event.target.complete();

      this.numberPage++;  
      if (this.numberPage < this.totalPage) {
        this.loadData();
      } else {
        //event.target.disabled = true;
      }
    }, 500);
  }

}
