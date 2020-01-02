import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() firstname;
  @Input() lastname;
  @Input() phoneNumber;
  @Input() email;
  @Input() url;
  @Input() desc;

  constructor(private modal: ModalController,
              private file: File,
              private fileChooser: FileChooser,
              private photoView: PhotoViewer,
              private userAuth: AngularFireAuth,
              private store: AngularFirestore,
              private platform: Platform) { }

  ngOnInit() {
    this.platform.backButton.subscribe(_=>{
      this.modal.dismiss();
    });
  }

  close() {
    this.modal.dismiss();
  }

  saveProfile() {
    this.store.collection('Users').doc('users-data').update({
      Firstname: this.firstname,
      Lastname: this.lastname,
      Phone_number: this.phoneNumber,
      Email: this.email,
      webUrl: this.url,
      Description: this.desc
    }).then(() => {
      this.modal.dismiss({
        firstname: this.firstname,
        lastname: this.lastname,
        phone: this.phoneNumber,
        mail: this.email,
        url: this.url,
        description: this.desc
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });

  }

  viewPhoto() {
    this.photoView.show('../assets/bg1.jp', 'Profile Picture');
  }

  choosePhoto() {
    this.fileChooser.open()
    .then((uri) => {
      console.log(uri);

      this.file.resolveLocalFilesystemUrl(uri).then((newUri) => {
        console.log(JSON.stringify(newUri));

        let dirPath = newUri.nativeURL;
        let dirPathSegment = dirPath.split('/');
        dirPathSegment.pop();
        dirPath = dirPathSegment.join('/');

        this.file.readAsArrayBuffer(dirPath, newUri.name).then((buffer) => {
          console.log('File name = ' + newUri.name);
          console.log('File directory = ' + buffer);
        });
      });
    })
    .catch(e => console.log(e));
  }
}
