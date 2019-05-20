import { Component, ViewChild} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { async } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // @ViewChild(Slides) mySlide: Slides;

  image1 = 'assets/icon/favicon.png';

  slideOptions = {
    loop: true
  };

  constructor(private alert: AlertController, private route: Router) {}


  getStarted = () => {
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alert.create({
      header: 'Confirm!',
      message: 'Are you ready for this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: '#10EC34'
        }, {
          text: 'Okay',
          handler: () => {
            this.route.navigate(['signup']);
          }
        }
      ]
    });

    await alert.present();
  }
}
