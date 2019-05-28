import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  register: FormGroup;

  userProfileCollection: any;
  userDoc: any;

  passwordType = 'password';
  passwordIcon = 'eye-off';

  confirmPasswordType = 'password';
  confirmPasswordIcon = 'eye-off';

  constructor(private fireStore: AngularFirestore,
              private route: Router,
              private alert: AlertController,
              public formBuilder: FormBuilder) {
    this.userDoc = this.fireStore.collection('Users').doc<any>('users-data');
    this.register = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z]+')
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
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
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z0-9.\-@]+@[a-zA-Z0-9\-]+.[a-zA-Z]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
        Validators.pattern('^[%*-_@!a-zA-Z0-9]+')
      ])),
      terms: new FormControl('', Validators.compose([
        Validators.required
      ]))
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
          text: 'Okay',
          handler: () => {
            this.route.navigate(['signup']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentFailureAlert() {
    const alert = await this.alert.create({
      header: 'Failed!',
      message: 'Failure creating account.',
      buttons: [
        {
          text: 'Ok!',
        }
      ]
    });

    await alert.present();
  }

  signUp() {
    // Add a new document in collection "cities"
    this.userDoc.set({
      // Firstname: this.firstName,
      // Lastname: this.lastName,
      // Phone_number: this.phone,
      // Email: this.email,
      // Password: this.password,
      // Terms: this.isChecked
    })
    .then(() => {
      this.presentSuccessAlert();
    })
    .catch((error: any) => {
      this.presentFailureAlert();
      console.error('Error writing document: ', error);
    });
  }

}
