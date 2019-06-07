import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { AlertController, ToastController} from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  @ViewChild(IonInfiniteScroll) scroll: IonInfiniteScroll;
  firstName: any;
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
              private appBrowser: InAppBrowser,
              public popover: PopoverController,
              private storage: NativeStorage) {
              }

  ngOnInit() {
     // OR you could try this out too
     // this.firstName = this.activatedRoute.snapshot.paramMap.get('username');
      this.presentLoading();
  }


  getApi() {
      this.httpClient
      .get(`https://newsapi.org/v2/top-headlines?country=ng&pageSize=5&page=${this.page}&apiKey=4f6e3e854d414e3b92fdac5c96c04102`)
      .subscribe((response) => {
      this.allNews = Array<any>(response);
      this.loader.dismiss();
      });

  }

  moreNews(event: any) {
    this.page++;
    this.httpClient
    .get(`https://newsapi.org/v2/top-headlines?country=ng&pageSize=5&page=${this.page}&apiKey=4f6e3e854d414e3b92fdac5c96c04102`)
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
      duration: 3000,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: () => {
            this.toast.dismiss();
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
    .get(`https://newsapi.org/v2/top-headlines?country=ng&apiKey=4f6e3e854d414e3b92fdac5c96c04102`)
    .subscribe((response) => {
      this.allNews = Array<any>(response);
      e.target.complete();
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popover.create({
      component: PopoverComponent,
      backdropDismiss: true,
      event: ev,
      animated: true,
      cssClass: 'customPop'
    });

    return await popover.present();
  }

  userProfile(event: any) {
    this.presentPopover(event);
  }

  addNews(img: string, title: string) {
    const image = encodeURIComponent(img);
    this.route.navigate(['my-news', image, title]);
    // this.storage.setItem('userNews', {img: image, text: title});
    // this.addedNews();
  }


}
