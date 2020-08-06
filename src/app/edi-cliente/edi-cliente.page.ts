import { Component, OnInit } from '@angular/core';
import { ProcessoDto } from 'src/models/processo.dto';
import { ProcessoService } from 'src/services/processo.service';
import { AppFunction } from '../app.function';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-edi-cliente',
  templateUrl: './edi-cliente.page.html',
  styleUrls: ['./edi-cliente.page.scss'],
})
export class EdiClientePage implements OnInit {

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
      },
      error => { 
        this.processos = [];
        console.log('procesos não encontrados');
      }); 
  }

  ajuda() {
    let texto = this.appFunc.getTexto("AJUDA_EDIC_PREPARAR");
    let msg = texto+'<br>'+'<br>';
    texto = texto = this.appFunc.getTexto("AJUDA_EDIC_INTEGRAR");
    msg = msg+texto+'<br>'+'<br>';
    msg = '<b><i>'+msg+'</b></i>';

    this.appFunc.mensagem(this.appFunc.getTexto('DESCRICAO_OPCOES_PT'), msg);

  }

}
