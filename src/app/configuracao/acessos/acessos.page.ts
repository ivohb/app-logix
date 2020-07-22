import { Component, OnInit, NgZone } from '@angular/core';
import { AcessoDto } from 'src/models/acesso.dto';
import { LoadingService } from 'src/services/loading.service';
import { AppFunction } from 'src/app/app.function';
import { NavController } from '@ionic/angular';
import { AcessoService } from 'src/services/acesso.service';

@Component({
  selector: 'app-acessos',
  templateUrl: './acessos.page.html',
  styleUrls: ['./acessos.page.scss'],
})
export class AcessosPage implements OnInit {

  acessos: AcessoDto[] = [];  
  numberPage: number = 0;
  totalPage: number = 0;
  totalElement: number = 0;
  searchkey: string = '';

  constructor(  
    private loading: LoadingService,
    private service: AcessoService,
    private appFunc: AppFunction,
    private zone: NgZone,
    private navCtrl: NavController
  ) {   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.numberPage = 0;
    this.acessos = [];
    this.loadData();
  }

  loadData() {
    this.loading.loadingPresent();
    this.service.findPage(this.numberPage, 10) 
      .subscribe(response => { 
          this.totalPage = response['totalPages']; 
          this.totalElement = response['totalElements'];
          this.acessos = this.acessos.concat(response['content']); 
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
        //event.target.disabled = true;
      }
    }, 500);
  }

  find() { 
    this.navCtrl.navigateBack('/configuracao/acessos/pesquisar');
  }

  addObject() {
    this.navCtrl.navigateBack('/configuracao/acessos/editar/0'); 
  }

  //método não utilizado
  showObject(id: string) { 
    let url = `/configuracao/acessos/editar/${id}`;
    this.navCtrl.navigateBack(url);
  }

  delete(obj: AcessoDto) {
    
    this.loading.loadingPresent();  
    this.service.delete(obj.id)
    .subscribe(response => {
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
      const index = this.acessos.indexOf( obj );
      this.acessos.splice(index, 1);
      console.log( this.acessos );
      this.refresh();
    },
    error => {
      this.loading.loadingDismiss();
    });        
  }

  refresh() {
    this.zone.run(() => {
      console.log('force update the screen');
    });
  }
  
}
