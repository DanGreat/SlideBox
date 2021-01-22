import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.scss'],
})

export class NewsModalComponent implements OnInit {

  @Input() image;
  @Input() news;
  @Input() title;
  @Input() sourceUrl;
  @Input() author;
  @Input() time;


  constructor(private modal: ModalController, private appBrowser: InAppBrowser) { }

  ngOnInit() {
  }

  back() {
    this.modal.dismiss();
  }

  viewSource() {
    const options: InAppBrowserOptions = {
      location: 'no'
    };
    const browser = this.appBrowser.create(this.sourceUrl, '_self', options);
    browser.show();
  }
}
