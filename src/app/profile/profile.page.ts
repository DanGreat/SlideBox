import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  fullName: string =  'Bassey Daniel';
  mailAddress: string = 'dbassey360@gmail.com';
  phone = 8170493109;
  webUrl: string = 'www.slidebox.com';

  firstName = this.fullName.slice(this.fullName.indexOf(' '), this.fullName.length);
  lastName = this.fullName.slice(0, this.fullName.indexOf(' '));

  constructor(private modal: ModalController) { }

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
        url: this.webUrl
      },
      animated: true
    });

    mymodal.onDidDismiss().then((response) => {
        const value = response.data;
        this.fullName = value.lastname + " " + value.firstname;
        this.phone = value.phone;
        this.mailAddress = value.mail;
        this.webUrl = value.url;
      }).catch(error => {
        console.log('Could not get data' + error);
      });

    return await mymodal.present();
    }

  editProfile() {
    this.editmodal();
  }
}
