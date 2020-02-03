import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController, Platform } from '@ionic/angular';
import { AlertController, ToastController} from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { BookmarkService } from 'src/services/bookmark.service';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient } from '@angular/common/http';
// import { IonicSelectableComponent } from 'ionic-selectable';
import { APIService } from "../../services/api.service";

@Component({
  selector: 'app-tech-category',
  templateUrl: './tech-category.page.html',
  styleUrls: ['./tech-category.page.scss'],
})
export class TechCategoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) scroll: IonInfiniteScroll;

  firstNews: any = [];
  allNews: any = [];

  page = 1;
     
    slidesOpts = {
      loop: true,
      initialSlide: 1,
      speed: 400,
      autoplay: {
        delay: 10000
      }
    }

  constructor(private apiService: APIService,
              private loader: LoadingController,
              private route: Router,
              private http: HttpClient,
              private alert: AlertController,
              private toast: ToastController,
              private appBrowser: InAppBrowser,
              private bookmark: BookmarkService,
              private network: Network,
              private platform: Platform) {}

  ngOnInit() { 

    // this.header.append("Accept", 'application/json');
    // this.header.append('Content-Type', 'application/json' );

    this.platform.ready().then(() => {
      this.getNews();
    }).catch(err=>{
      console.error("Platform not ready to display news", err);
    });
   
  }

  getNews() {
    this.http
    // tslint:disable-next-line: max-line-length
    .get(`https://newsapi.org/v2/top-headlines?country=ng&category=technology&pageSize=8&page=${this.page}&apiKey=4f6e3e854d414e3b92fdac5c96c04102`)
    .subscribe((response) => {
      this.allNews = Array<any>(response);
      console.log("Tech News", this.allNews);
      this.firstNews = this.allNews[0].articles.splice(0, 3);
     });
  }

  moreNews(event: any) {
    this.page++;
    this.http
    // tslint:disable-next-line: max-line-length
    .get(`https://newsapi.org/v2/top-headlines?country=ng&category=technology&pageSize=5&page=${this.page}&apiKey=4f6e3e854d414e3b92fdac5c96c04102`)
    .subscribe((response) => {
      const more: any = Array<any>(response);
      for (const article of more) {
        this.allNews.push(article);
      }
      event.target.complete();
    });
  }

  refresh(e) {
    this.http
    .get(`https://newsapi.org/v2/top-headlines?country=ng&category=technology&apiKey=4f6e3e854d414e3b92fdac5c96c04102`)
    .subscribe((response)=>{
      this.allNews = Array<any>(response);
    })
    e.target.complete();
  }

  readNews(url: string) {
    const options: InAppBrowserOptions = {
      location: 'no'
    };
    const browser = this.appBrowser.create(url, '_self', options);
    browser.show();
  }

  async networkFailure() {
    const network = await this.alert.create({
      header: 'Network Error',
      message: 'Please check your internet connection.',
      buttons: [
        {
          text: 'Retry',
          handler: () => {
            // this.getNews();
          }
        }
      ]
    });
  }

  async addedNews() {
    const toast = await this.toast.create({
      message: 'News added',
      duration: 5000,
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

  // addNews(url: string, title: string, img: string ) {
  //   this.databaseService.addNews(url, title, img);
  //   this.addedNews();
  // }

}
