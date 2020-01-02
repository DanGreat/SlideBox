import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

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
              private loader: LoadingController,
              public fromBuilder: FormBuilder,
              private userAuth: AngularFireAuth) {
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
    this.route.navigate(['main']);
    // if (this.email && this.password) {
    //   this.Logging();
    //   this.userAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
    //     this.route.navigate(['main']);
    //   }).then(()=>{
    //     this.loader.dismiss();
    //   }).catch(error => {
    //     this.signinFailed(error);
    //   });
    // }
  }

  signUp = () => {
    this.route.navigate(['create-account']);
  }

  async signinFailed(err) {
    const alert = await this.alert.create({
      header: 'Oops!!',
      subHeader: 'Could not log you in.',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }

  async Logging() {
    const load = await this.loader.create({
      message: "Loging In...",
      spinner: "bubbles",
      backdropDismiss: false
    });

    await load.present();
  }
}
