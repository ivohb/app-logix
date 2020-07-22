import { Component, OnInit, NgZone } from '@angular/core';
import { AcessoDto } from 'src/models/acesso.dto';
import { LoadingService } from 'src/services/loading.service';
import { AcessoService } from 'src/services/acesso.service';
import { ModuloService } from 'src/services/modulo.service';
import { AppFunction } from 'src/app/app.function';
import { ActivatedRoute } from '@angular/router';
import { PerfilService } from 'src/services/perfil.service';
import { PerfilDto } from 'src/models/perfil.dto';
import { ModuloDto } from 'src/models/modulo.dto';
import { ProcessoDto } from 'src/models/processo.dto';
import { ProcessoService } from 'src/services/processo.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  perfil: number;
  modulo: number;  
  model : AcessoDto = {
    id: "",
    perfil: 0,
    nome: "",
    processo: 0,
    titulo: "",
    modulo: ""
  };

  perfis: PerfilDto[] = [];
  modulos: ModuloDto[] = [];
  processos: ProcessoDto[] = [];

  constructor(
    private loading: LoadingService,
    private service: AcessoService,
    private perfilService: PerfilService,
    private moduloService: ModuloService,
    private processoService: ProcessoService,
    private appFunc: AppFunction,
    private zone: NgZone,
    public route: ActivatedRoute 

  ) {  }

  ngOnInit() {
    this.findAllPerfis();
    this.findAllModulo();
  }

  findAllPerfis() {
    this.perfilService.findAll()
    .subscribe(response => {
      this.perfis = response;
    },
    error => {
      console.log(error);
    });
  }

  findAllModulo() {
    this.moduloService.findAll()
    .subscribe(response => {
      this.modulos = response;
    },
    error => {
      console.log(error);
    });
  }

  findProcessos() {
    if (this.perfil > 0 && this.modulo > 0) {
      this.processoService.findNoAccess(this.perfil, this.modulo)
      .subscribe(response => {
        this.processos = response;
        console.log(this.processos);
      },
      error => {
        console.log(error);
      });
    }
  }

  addObject(obj: ProcessoDto) {
    console.log(this.perfil);
    console.log(this.model);
    this.model.perfil = this.perfil;
    this.model.processo = Number(obj.id);
    this.loading.loadingPresent();  
    this.service.insert(this.model)
    .subscribe(response => {
      this.loading.loadingDismiss();
      let texto = this.appFunc.getTexto("OPERACAO_SUCESSO");
      this.appFunc.presentToast(texto);
      const index = this.processos.indexOf( obj );
      this.processos.splice(index, 1);
      console.log( this.processos );
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
