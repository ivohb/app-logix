import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EdiClienteDto } from 'src/models/edi.cliente.dto';
import { LoadingService } from 'src/services/loading.service';
import { NavController } from '@ionic/angular';
import { AppFunction } from 'src/app/app.function';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClienteItemService } from 'src/services/cliente.item.service';
import { ClienteItemDto } from 'src/models/cliente.item.dto.';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  fg: FormGroup;
  model: EdiClienteDto;
  desabilita : boolean;
  excluir: boolean;
  loader: any;
  id: string;

  lista: EdiClienteDto[] = [];
  popup: ClienteItemDto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loading: LoadingService,
    private ciService: ClienteItemService,
    private navCtrl: NavController, 
    private appFunc: AppFunction,
    public route: ActivatedRoute 

  ) {
    this.route.paramMap.subscribe( (params:ParamMap) =>  { 
        this.id = params.get("id")
     })
  }


  ngOnInit() {
    this.fg = this.formBuilder.group({
      id:       ['', []],
      empresa:  ['', []],
      pedido:   ['', [Validators.required, Validators.maxLength(30)]],
      produto:  ['', [Validators.required, Validators.maxLength(30)]]
    })
    this.findByEmpresa();
  }


  findByEmpresa() { 
    this.ciService.findByEmpresa('01')
    .subscribe(response => {
      this.popup = response;
      console.log(this.popup);
    },
    error => {
      console.log(error);
    });
  }

}
