import { Component, OnInit  } from '@angular/core';
import { UsuarioDto } from 'src/models/usuario.dto';
import { LoadingService } from 'src/services/loading.service';
import { UsuarioService } from 'src/services/usuario.service';
import { NavController } from '@ionic/angular';
import { AppFunction } from 'src/app/app.function';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})

export class UsuariosPage implements OnInit {

  usuarios : UsuarioDto[] = [];  
  numberPage: number = 0;
  totalPage: number = 0;
  totalElement: number = 0;
  
  constructor(  
    private loading: LoadingService,
    private usuarioService: UsuarioService,
    private appFunc: AppFunction,
    private navCtrl: NavController
  ) {   }
 
  
  //ao criar a página
  ngOnInit() {  } 

  //ao carregar a pagina
  ionViewWillEnter() {
    console.log(this.usuarioService.nome);
    this.numberPage = 0;
    this.usuarios = [];
    this.loadData();
  }

  loadData() {
    this.loading.loadingPresent();
    //chamada assincrona da função
    this.usuarioService.findPage(this.numberPage, 10) 
      .subscribe(response => { //função executa na resposta, se tudo ok
          //caso queira carregar as imaens do amazon, chamar a funcão 
          //loadImageUrls(start, end);
          //let start = this.usuarios.length;
          //como é uma listagem paginada, os usuários estão na propriedade content
          this.totalPage = response['totalPages']; 
          this.totalElement = response['totalElements'];
          this.usuarios = this.usuarios.concat(response['content']); 
          //this.usuarios = response;
          //let end = this.usuarios.length;
          this.loading.loadingDismiss();
          if (this.totalElement == 0) {
            let texto = this.appFunc.getTexto("DADOS_NAO_ENCONTRADO");
            this.appFunc.presentToast(texto);
          }
          //this.loadImageUrls(start, end);
      },
      error => {
        this.loading.loadingDismiss();
      }); //função executada se der erro (nada faz por enquanto)

  }

  //quando atinge o início da página
  doRefresh(event) {
    setTimeout(() => {
      //this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }
  
  find() { 
    this.navCtrl.navigateBack('/configuracao/usuarios/pesquisar');
  }

  addObject() {
    this.navCtrl.navigateBack('/configuracao/usuarios/editar/0');
  }

  showObject(id: string) {
    let url = `/configuracao/usuarios/editar/${id}`;
    this.navCtrl.navigateBack(url);
  }
    
  //quando atinge o final da página
  doInfinite(event) {
    setTimeout(() => {
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      this.numberPage++;  
      if (this.numberPage < this.totalPage) {
        console.log(this.numberPage);
        this.loadData();
      } else {
        event.target.disabled = true;
      }
    }, 500);
  }
  
  //ao arrastar a barra de rolagem (implementar)
  scrollbar(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
  
  
}
