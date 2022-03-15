import { CorreioService } from './../../services/correio.service';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
correio : any = {};
eventosCollection :any[]=[];
  constructor(private correioService : CorreioService, private toastCtrl : ToastController) {}

  localizarObjeto(evento){
    let codigoObjeto: string  = evento.detail.value;

    

    this.correioService.localizarObjeto(codigoObjeto)
    .then(response=>{

     
      let correio :any = response;
    
      this.eventosCollection = correio.objetos[0].eventos;

      if(response==undefined){
        this.enviarToast('objeto não encontrado');
        return;
      }//end if
    })
    .catch(erro=>{
      this.enviarToast('objeto não encontrado');
    });
  }

  async enviarToast(mensagem : string){
    const toast = await this.toastCtrl.create({
      message: 'Código de rastreio não encontrado',
      icon: 'alert-circle-outline',
      duration: 6000,
      buttons: ['OK'],
    });
    toast.present();
  }

  async janela(){
      const toast = await this.toastCtrl.create({
        header: 'Localização',
        message: 'Click to Close',
        icon: 'information-circle',
        position: 'top',
        buttons: [
           {
            text: 'Done',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      await toast.present();
  
      const { role } = await toast.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
  }//end janela

