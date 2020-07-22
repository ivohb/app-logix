import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModuloService } from 'src/services/modulo.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {

  titulo: string = '';
  situacao: string = '';

  constructor( 
    private navCtrl: NavController, 
    private moduloService: ModuloService, 

  ) {    }

  ngOnInit() {  }

  pesquisar() {
    this.moduloService.titulo = this.titulo;
    this.moduloService.situacao = this.situacao;
    this.navCtrl.back();
  }

}
