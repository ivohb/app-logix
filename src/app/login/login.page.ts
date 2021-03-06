import { Component, OnInit } from '@angular/core';
import { MenuController, Events, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginDto } from 'src/models/login.dto';
import { AuthService } from 'src/services/auth.servece';
import { ProcessoDto } from 'src/models/processo.dto';
import { ProcessoService } from 'src/services/processo.service';
import { StorageService } from 'src/services/storage.service';
import { AppFunction } from '../app.function';
import { ModuloService } from 'src/services/modulo.service';
import { ModuloDto } from 'src/models/modulo.dto';
import { EmpresaDto } from 'src/models/empresa.dto';
import { EmpresaService } from 'src/services/empresa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login : LoginDto = {
    codigo: "",
    senha: "",
    empresa: ""
  };

  empresas: EmpresaDto[];
  processos: ProcessoDto[]; 
  modulos: ModuloDto[];

  constructor(
    private appFunc: AppFunction,
    private storage: StorageService,
    private auth: AuthService,
    private proc: ProcessoService,
    private modulo: ModuloService,
    private empresa: EmpresaService,
    private rota: Router,
    public events: Events,
    private navCtrl: NavController,
    private menuCtrl: MenuController  ) { 
      this.menuCtrl.enable(false);
    }

  ngOnInit() {
    this.storage.setLocalUser(null);
    this.findCompanyAuth();
  }

  findCompanyAuth() {
    this.empresa.findCompanyAuth()
    .subscribe(response => {
      this.empresas = response;
      console.log(this.empresas);
    },
    error => {
      console.log(error);
    });
  }

  autorizar() {
    this.navCtrl.navigateBack('/autorizacao');
  }
  
  documentacao() {
    this.navCtrl.navigateBack('/documentacao');
}

  forgot() {
    this.navCtrl.navigateBack('/forgot');
  }

  entrar() {
   
    let msg = '';
 
    if (this.login.codigo.length == 0 ) {
      let texto = this.appFunc.getTexto("CAMPO_OBRIGATORIO")+": ";
      texto+=this.appFunc.getTexto("LABEL_CODIGO");
      msg=msg+texto+"<br>"
    } 

    if (this.login.senha.length == 0 ) {
      let texto = this.appFunc.getTexto("CAMPO_OBRIGATORIO")+": ";
      texto+=this.appFunc.getTexto("LABEL_SENHA");
      msg=msg+texto+"<br>"
    } 

    if (this.login.empresa.length == 0 ) {
      let texto = this.appFunc.getTexto("CAMPO_OBRIGATORIO")+": ";
      texto+=this.appFunc.getTexto("LABEL_EMPRESA");
      msg=msg+texto+"<br>"
    } 

    if (msg.length > 0) {
      this.appFunc.mensagem(this.appFunc.getTexto('ERRO_VALIDACAO'), msg);
      return;
    }

    this.auth.autenticacao(this.login)
      .subscribe(response => {
        this.auth.login(
          response.headers.get('Authorization'), 
            response.headers.get('Profile'),  response.headers.get('Empresa'));
          let perfil =  response.headers.get('Profile');
          this.modulo.findByPerfil(perfil)
          .subscribe(
            response => { 
              this.modulos = response; 
              this.events.publish('login:sucesso', this.modulos);
              this.rota.navigate(['/home'])  
            },
            error => { });       
      },
      error => {
        //O tratamento do erro está sendo feita pelo interceptador.
      });     
  }

}
