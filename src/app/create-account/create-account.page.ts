import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  register: FormGroup;

  passwordType = 'password';
  passwordIcon = 'eye-off';
  confirmPasswordType = 'password';
  confirmPasswordIcon = 'eye-off';

  constructor(private route: Router,
              private alert: AlertController,
              public formBuilder: FormBuilder,
              private userAuth: AngularFireAuth,
              private userStore: AngularFirestore,
              private storage: NativeStorage
              ) {
    this.register = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z]+')
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z]+')
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(20),
        Validators.pattern('^[0-9]+')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
        Validators.pattern('[a-zA-Z0-9.-@]+@[a-zA-Z0-9-]+.[a-zA-Z]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ])),
      terms: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  showHidePassword() {
    if (this.passwordType === 'password' && this.passwordIcon === 'eye-off') {
        this.passwordType = 'text';
        this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }

  showHideConfirmPassword() {
    if (this.confirmPasswordType === 'password' && this.confirmPasswordIcon === 'eye-off') {
        this.confirmPasswordType = 'text';
        this.confirmPasswordIcon = 'eye';
    } else {
      this.confirmPasswordType = 'password';
      this.confirmPasswordIcon = 'eye-off';
    }
  }

  async presentSuccessAlert() {
    const alert = await this.alert.create({
      header: 'Success!',
      message: 'Account Successfully Created',
      buttons: [
        {
          text: 'Ok!',
          handler: () => {
            this.route.navigate(['signup']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentFailureAlert(error: any) {
    const alert = await this.alert.create({
      header: 'Failed!',
      message: error,
      buttons: [
        {
          text: 'Ok!',
        }
      ]
    });

    await alert.present();
  }

  signUp() {
    let email;
    let password;
    email = this.register.value.email;
    password = this.register.value.password;

    if (email && password) {
      this.userAuth.auth.createUserWithEmailAndPassword(email, password).then(() => {
       // this.storage.setItem('userId', this.userAuth.auth.currentUser.uid);
        localStorage.setItem('userId', this.userAuth.auth.currentUser.uid);
        this.userAuth.auth.currentUser.updateProfile({
          displayName: this.register.value.lastname + " " + this.register.value.firstname,
          photoURL: ''
        });
        this.presentSuccessAlert();
      }).catch(err => {
        this.presentFailureAlert(err);
      });
    } else {
      console.log(email);
      console.log(password);
    }
  }

}
