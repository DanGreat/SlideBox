import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  loginForm: FormGroup;

  image1 = 'assets/icon/favicon.png';

  email: string = '';
  password: string = '';

  errorMessage = [
  ];

  constructor(private route: Router,
              private alert: AlertController,
              public fromBuilder: FormBuilder) {
    this.loginForm = this.fromBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z0-9.-@]+@[a-zA-Z0-9-]+.[a-zA-Z]+$')
      ]))
    });
  }

  ngOnInit() {
  }

  signIn = () => {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    if (!this.email && !this.password) {
      this.signupFailed();
    } else {
      this.route.navigate(['main']);
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
