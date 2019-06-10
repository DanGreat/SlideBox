import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';


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
              private fileChooser: FileChooser) { }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss();
  }

  saveProfile() {
    this.modal.dismiss({
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phoneNumber,
      mail: this.email,
      url: this.url,
      description: this.desc
    });
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
