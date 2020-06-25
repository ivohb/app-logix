import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-documentacao',
  templateUrl: './documentacao.page.html',
  styleUrls: ['./documentacao.page.scss'],
})
export class DocumentacaoPage implements OnInit {

  constructor( private navCtrl: NavController,
    ) { }

  ngOnInit() {
  }

  voltar() {
    this.navCtrl.back();
  }

}
