import { Component, OnInit } from '@angular/core';
import { EdiClientProgramDto } from 'src/models/edi.client.program.dto';
import { EdiClientProgramService } from 'src/services/edi.client.program.service';
import { NavController, AlertController } from '@ionic/angular';
import { AppFunction } from 'src/app/app.function';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  lista: EdiClientProgramDto[] = [];

  id: string;
  ediCliente: number;
  empresa: string;

  constructor(
    private ecpService: EdiClientProgramService,
    private navCtrl: NavController, 
    private appFunc: AppFunction,
    public route: ActivatedRoute ,
    private alertCtrl: AlertController,
    private storage: StorageService

  ) {  }

  ngOnInit() {    
    let localUser = this.storage.getLocalUser(); 
    this.empresa = localUser.empresa;
    let localEdi = this.storage.getLocalEdi(); 
    this.id = localEdi.id;
    if (this.id != '0') {
      this.findByEdiCliente();
    }    
  }

  findByEdiCliente() {
    this.ediCliente = Number(this.id);
    this.ecpService.findByEdiCliente(this.ediCliente)
    .subscribe(response => {
      this.lista = response;
    },
    error => {
      console.log(error);
    });
  }

}
