import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  newsUrl: any;

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private appBrowser: InAppBrowser) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      this.newsUrl = decodeURIComponent(data.newsUrl);
    });

    const options: InAppBrowserOptions = {
      location: 'no',
  		// toolbarposition: 'bottom',
  		// toolbarcolor: '#488aff',
  		// navigationbuttoncolor: '#ffffff',
  		// hideurlbar: 'yes',
  		// closebuttoncaption: 'close'
    };

    const browser = this.appBrowser.create(this.newsUrl, '_self', options);
    browser.show();

  }
}
