import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../components/modal/modal.component';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  fullName;
  mailAddress;
  phone;
  webUrl;
  descritption;

  // firstName = this.fullName.slice(this.fullName.indexOf(' '), this.fullName.length);
  // lastName = this.fullName.slice(0, this.fullName.indexOf(' '));
  firstName;
  lastName;
  uid;
  usersData = [];

  constructor(private modal: ModalController,
              private storage: NativeStorage,
              private store: AngularFirestore,
              private userAuth: AngularFireAuth) { 
                //this.uid = this.storage.getItem('UserId');
                this.uid = localStorage.getItem('UserId');
                this.store.collection('Users').doc('users-data').get().subscribe((result) => {
                  if (result.exists) {
                    this.firstName = result.data().Firstname;
                    this.lastName = result.data().Lastname;
                    this.mailAddress = result.data().Email;
                    this.webUrl = result.data().webUrl;
                    this.phone = result.data().Phone_number;
                    this.descritption = result.data().Description;
                  }
                });
              }

  ngOnInit() {
  }

  async editmodal() {
    const mymodal = await this.modal.create({
      component: ModalComponent,
      backdropDismiss: false,
      componentProps: {
        firstname: this.firstName,
        lastname: this.lastName,
        phoneNumber: this.phone,
        email: this.mailAddress,
        url: this.webUrl,
        desc: this.descritption
      },
      animated: true
    });

    mymodal.onDidDismiss().then((response) => {
        const value = response.data;
        this.fullName = value.lastname + " " + value.firstname;
        this.phone = value.phone;
        this.mailAddress = value.mail;
        this.webUrl = value.url;
        this.descritption = value.description;
      }).catch(error => {
        console.log('Could not get data' + error);
      });

    return await mymodal.present();
    }

  editProfile() {
    if (this.uid === this.userAuth.auth.currentUser.uid) {
      this.editmodal();
    }
  }
}
