import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { ToastController, AlertController  } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-tech-category',
  templateUrl: './tech-category.page.html',
  styleUrls: ['./tech-category.page.scss'],
})
export class TechCategoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) scroll: IonInfiniteScroll;
  allNews: any = [];
  page = 1;

  slideOpt = {
    loop: true,
  };
  constructor(private httpClient: HttpClient,
              private loader: LoadingController,
              private route: Router,
              private alert: AlertController,
              private toast: ToastController,
              private appBrowser: InAppBrowser) { }

  ngOnInit() {
    this.presentLoading();
  }

  getApi() {
    this.httpClient
  // tslint:disable-next-line: max-line-length
    .get(`https://newsapi.org/v2/top-headlines?country=ng&category=technology&pageSize=5&page=${this.page}&apiKey=4f6e3e854d414e3b92fdac5c96c04102`)
    .subscribe((response) => {
    this.allNews = Array<any>(response);
    this.loader.dismiss();
    });
  }

  moreNews(event: any) {
    this.page++;
    this.httpClient
    // tslint:disable-next-line: max-line-length
    .get(`https://newsapi.org/v2/top-headlines?country=ng&category=technology&pageSize=5&page=${this.page}&apiKey=4f6e3e854d414e3b92fdac5c96c04102`)
    .subscribe((response) => {
      const more = Array<any>(response);
      for (const article of more) {
        this.allNews.push(article);
      }
      event.target.complete();
    });
  }

  async presentLoading() {
    const loading = await this.loader.create({
      message: 'Loading News...',
      spinner: 'bubbles',
    });
    await loading.present();
    this.getApi();
  }

  async networkFailure() {
    const network = await this.alert.create({
      header: 'Network Error',
      message: 'Please check your internet connection.',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.loader.dismiss();
          }
        }
      ]
    });
  }

  async addedNews() {
    const toast = await this.toast.create({
      message: 'News added',
      duration: 2000,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  readNews(url: string) {
    const options: InAppBrowserOptions = {
      location: 'no',
  		toolbarposition: 'top',
  		toolbarcolor: '#488aff',
  		navigationbuttoncolor: '#ffffff',
  		hideurlbar: 'yes',
  		closebuttoncaption: 'close'
    };
    const browser = this.appBrowser.create(url, '_self', options);
    browser.show();
  }

  refresh(e) {
    this.httpClient
   .get(`https://newsapi.org/v2/top-headlines?country=ng&category=technology&apiKey=4f6e3e854d414e3b92fdac5c96c04102`)
   .subscribe((response) => {
      this.allNews = Array<any>(response);
      e.target.complete();
   });
 }

 addNews() {
  this.addedNews();
}

}
