import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

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
    duration: 4000
  };


  constructor(private activatedRoute: ActivatedRoute,
              private httpClient: HttpClient,
              private loader: LoadingController,
              private route: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.firstName = data.username;
    });
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

  readNews(url: string) {
    const newsUrl = encodeURIComponent(url);
    this.route.navigate(['news', newsUrl]);
  }


}
