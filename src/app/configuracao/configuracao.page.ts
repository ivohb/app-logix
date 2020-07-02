import { Component, OnInit } from '@angular/core';
import { ProcessoDto } from 'src/models/processo.dto';
import { ProcessoService } from 'src/services/processo.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppFunction } from '../app.function';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {

  modulo: string;
  perfil: string;
  processos: ProcessoDto[]; 
  
  constructor(
    private proc: ProcessoService,
    private appFunc: AppFunction,
    private route: ActivatedRoute,
    private storage: StorageService
    ) {
      this.route.paramMap.subscribe( (params:ParamMap) =>
      { 
       this.modulo = params.get("modulo");
      })
  }
 
  ngOnInit() {
    if (this.modulo.substring(0,1) != ':') {
      this.proc.setModulo(this.modulo);      
    }    
    this.loadProces(this.modulo);
  }

  loadProces(modulo: string) {
    let localModulo = this.storage.getLocalModulo(); 
    this.proc.findByPerfilAndModulo(localModulo.modulo)
    .subscribe(
      response => { 
        this.processos = response; 
        console.log(this.processos);
      },
      error => { 
        this.processos = [];
        console.log('procesos não encontrados');
      }); 
  }

  ajuda() {
    let texto = this.appFunc.getTexto("AJUDA_USUARIO");
    let msg = texto+'<br>'+'<br>';
    texto = this.appFunc.getTexto("AJUDA_MODULO");
    msg = msg+texto+'<br>'+'<br>';
    texto = texto = this.appFunc.getTexto("AJUDA_PROCESSO");
    msg = msg+texto+'<br>'+'<br>';
    texto = texto = this.appFunc.getTexto("AJUDA_ACESSO");
    msg = msg+texto+'<br>'+'<br>';
    texto = texto = this.appFunc.getTexto("AJUDA_PERFIL");
    msg = msg+texto+'<br>'+'<br>';
    msg = '<b><i>'+msg+'</b></i>';

    this.appFunc.mensagem(this.appFunc.getTexto('DESCRICAO_OPCOES_PT'), msg);

  }

}
