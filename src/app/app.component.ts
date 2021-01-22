import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController, AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  dark = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route: Router,
    private menu: MenuController,
    private userAuth: AngularFireAuth,
    private toast: ToastController,
    private alert: AlertController,
    private theme: NativeStorage
  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.theme.getItem('THEME').then((theme) => {
        this.dark = theme;
      });
    });
  }

  // exitApp(){
  //   this.platform.backButton.subscribe(()=>{
  //     this.toast.create({
  //       message: "Press again to exit app."
  //     });
  //   });
  // }

  logout() {
      this.theme.setItem('THEME', this.dark);
      this.menu.close('menu');
      this.userAuth.auth.signOut().then(() => {
        this.route.navigate(['signup']);
      });
  }
}
