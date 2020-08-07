import { AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Funções diversas para uso em todo aplicativo
 */
export class AppFunction {

  constructor(
      private alertCtrl: AlertController,
      private translate: TranslateService,
      private toastCtrl: ToastController

    ) {

  }

  /** 
   * apenas repassa os parâmetros para a função alerta, pois a
   * mesma não pode ser chamada por ser do tipo async
  */
  mensagem(titulo: string, msg: string) {
      this.alerta(titulo, msg);
  }

  /**
   * @param titulo: título da janela de alerta
   * @param msg: texto do corpo da janela de alerta 
   */
  async alerta(titulo: string, msg: string) {
      const alert = await this.alertCtrl.create({
        header: titulo,
        subHeader: '',
        message: msg,
        buttons: ['OK']
      });    
      await alert.present();
  }

  async AlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Tem certeza?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * @param chave: chave do arquivo de idioma
   * @returns: texto traduzido para o idioma do aplicativo
   */
  getTexto(chave: string): string {
      let texto = "";
      this.translate.get(chave).subscribe(
      value => {
          texto = value;
      }
      )  
      return texto;
  }

  async presentToast(msg: string) {
      const toast = await this.toastCtrl.create({
        message: msg,
        duration: 2000,  
        color: 'header'
      });
      toast.present();
  }

  getIdByUrl(url: string): string {
    for (let i = url.length; i >=0;  i--) {
      let dig = url.substring(i,i+1)
      if (dig == '/') {
        let id=url.substring(i+1,url.length);
        return id;
      } 
    } 
    return '';   
  }

}
