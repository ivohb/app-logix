import { Component, OnInit } from '@angular/core';
import { ModuloDto } from 'src/models/modulo.dto';
import { PerfilDto } from 'src/models/perfil.dto';
import { ModuloService } from 'src/services/modulo.service';
import { AcessoService } from 'src/services/acesso.service';
import { NavController } from '@ionic/angular';
import { PerfilService } from 'src/services/perfil.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {
  modulo: number = 0; 
  perfil: number = 0;

  perfis: PerfilDto[] = [];
  modulos: ModuloDto[] = [];

  constructor(
    private acessoService: AcessoService,
    private moduloService: ModuloService,
    private perfilService: PerfilService,
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

    this.perfilService.findAll()
    .subscribe(response => {
      this.perfis = response;
    },
    error => {
      console.log(error);
    });
  }

  pesquisar() {    
    this.acessoService.perfil = this.perfil;
    this.acessoService.modulo = this.modulo;
    this.navCtrl.back();
  }
 
}
