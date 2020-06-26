import { Component, OnInit } from '@angular/core';
import { AppFunction } from 'src/app/app.function';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/services/usuario.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage implements OnInit {

  nome: string = '';

  constructor(
    private navCtrl: NavController, 
    private appFunc: AppFunction,
    private usuarioService: UsuarioService,

  ) { }

  ngOnInit() {
    console.log(this.usuarioService.nome);
  }

  pesquisar() {
    this.usuarioService.nome = this.nome;
    this.navCtrl.back();
  }
}
