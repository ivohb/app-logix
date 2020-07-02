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

  codigo: string = '';
  nome: string = '';
  pessoa: string = '';
  cpfCnpj: string = '';
  codPessoa: string = '';

  constructor(
    private navCtrl: NavController, 
    private usuarioService: UsuarioService, 

  ) { }

  ngOnInit() {
  }

  pesquisar() {
    this.usuarioService.codigo = this.codigo;
    this.usuarioService.nome = this.nome;
    this.usuarioService.pessoa = this.pessoa;
    this.usuarioService.cpfCnpj = this.cpfCnpj;
    this.navCtrl.back();
  }
}
