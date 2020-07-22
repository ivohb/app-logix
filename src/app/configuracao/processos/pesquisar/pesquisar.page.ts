import { Component, OnInit } from '@angular/core';
import { ModuloDto } from 'src/models/modulo.dto';
import { ModuloService } from 'src/services/modulo.service';
import { NavController } from '@ionic/angular';
import { ProcessoService } from 'src/services/processo.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {

  modulo: number; 
  titulo: string = '';
  situacao: string = '';

  modulos: ModuloDto[] = [];

  constructor(
    private processoService: ProcessoService,
    private moduloService: ModuloService,
    private navCtrl: NavController, 

  ) {  }

  ngOnInit() {
  }

    //Cada vez que a página for aberta
  ionViewWillEnter() {
    this.moduloService.findAll()
    .subscribe(response => {
      this.modulos = response;
    },
    error => {
      console.log(error);
    });
  }

  pesquisar() {
    
    this.processoService.modulo = this.modulo;
    this.processoService.titulo = this.titulo;
    this.processoService.situacao = this.situacao;
    this.navCtrl.back();
  }

}
