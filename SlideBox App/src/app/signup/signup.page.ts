import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  image1 = 'assets/icon/favicon.png';

  firstName: string = '';
  password: string = '';

  constructor(private route: Router, private alert: AlertController) { }

  ngOnInit() {
  }

  signIn = () => {
    if (!this.firstName && !this.password) {
      this.signupFailed();

    } else {
      this.route.navigate(['main', this.firstName]);
    }
  }

  signUp = () => {
    this.route.navigate(['create-account']);
  }
  async signupFailed() {
    const alert = await this.alert.create({
      header: 'Error',
      subHeader: 'Could not sign you up.',
      message: 'Please provide credentials.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
