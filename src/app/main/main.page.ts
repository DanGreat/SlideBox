import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { AlertController, ToastController} from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover.component';
import { DatabaseService } from 'src/app/database.service';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  @ViewChild(IonInfiniteScroll) scroll: IonInfiniteScroll;
  allNews: any = [];
  page = 1;
  tabCategory = [
    {link: '/health-category', title: 'Health'},
    {link: '/science-category', title: 'Science'},
    {link: '/sports-category', title: 'Sports'},
    {link: '/business-category', title: 'Business'},
    {link: '/tech-category', title: 'Technology'},
    {link: '/leisure-category', title: 'Entertainment'}
  ];
  slideOpt = {
    loop: true,
    autoplay: {
      delay: 5000
    },
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  };
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient,
              private loader: LoadingController,
              private route: Router,
              private alert: AlertController,
              private toast: ToastController,
              private appBrowser: InAppBrowser,
              public popover: PopoverController,
              private databaseService: DatabaseService) {
              }

  ngOnInit() {
     // OR you could try this out too
     // this.firstName = this.activatedRoute.snapshot.paramMap.get('username');
      this.getApi();
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

  readNews(url: string) {
    const options: InAppBrowserOptions = {
      location: 'no'
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

  addNews(url: string, title: string, img: string ) {
    this.databaseService.addNews(url, title, img);
    this.addedNews();
  }

  // searchNews(ev) {
  //   let list = [];
  //   let searchTxt = ev.target.value;
  //   for (let index = 0; index < this.allNews[0].articles.length; index++) {
  //    list.push(this.allNews[0].articles[index].title.toLowerCase());
  //     console.log(this.allNews[0].articles[index].title.indexOf(searchTxt));
      
  //   }
  // }

}
