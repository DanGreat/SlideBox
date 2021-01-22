import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, Platform, ModalController, PopoverController, LoadingController } from '@ionic/angular';
import { AlertController, ToastController} from '@ionic/angular';
import { BookmarkService } from 'src/services/bookmark.service';
// import { IonicSelectableComponent } from 'ionic-selectable';
import { APIService } from '../../services/api.service';
import { NewsModalComponent } from 'src/components/news-modal/news-modal.component';
import { PopoverComponent } from 'src/components/popover/popover.component';
import { CountryServiceService } from '../../services/country-service.service';

@Component({
  selector: 'app-science-category',
  templateUrl: './science-category.page.html',
  styleUrls: ['./science-category.page.scss'],
})
export class ScienceCategoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) scroll: IonInfiniteScroll;

  firstNews: any = [];
  allNews: any = [];
  country = 'ng';
  category = 'science';

  page = 1;

    slidesOpts = {
      loop: true,
      initialSlide: 1,
      speed: 400,
      autoplay: {
        delay: 6000
      }
    };

  constructor(private apiService: APIService,
              private alert: AlertController,
              private toast: ToastController,
              public popover: PopoverController,
              private bookmark: BookmarkService,
              private modal: ModalController,
              private platform: Platform,
              private loader: LoadingController,
              private countryService: CountryServiceService) {
                // Get saved country from native storage instead
                this.country = localStorage.getItem('COUNTRY');
              }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.getNews(this.country);
      this.countryService.country$.subscribe((country) => {
        this.popover.dismiss();
        this.loading();
        this.getNews(country);
        this.country = country;
      });
    }).catch(err => {
      console.error('Platform not ready to display new', err);
    });

  }

  getNews(country: string) {
    this.apiService.loadCategoryNews(this.page, this.category, country).subscribe((result) => {
      this.allNews = Array<any>(result);
      console.log('First News', this.allNews);
      this.firstNews = this.allNews[0].articles.splice(0, 3);
      this.loader.dismiss();
    },
    (error) => {
      if (error.ok === false) {
        if (this.loader) { this.loader.dismiss(); }
        this.networkFailure();
      }
    });
  }

  moreNews(event: any) {
    this.page++;
    this.apiService.loadCategoryNews(this.page, this.category, this.country)
      .subscribe((response) => {
      const more: any = Array<any>(response);
      for (const article of more) {
        this.allNews.push(article);
      }
      event.target.complete();
    },
    (error) => {
      if (error.ok === false) {
        this.networkFailure();
      }
    }
    );

  }


  refresh(e) {
    this.apiService.loadCategoryNews(this.page, this.category, this.country)
    .subscribe((response) => {
      this.allNews = Array<any>(response);
    },
    (error) => {
      if (error.ok === false) {
        this.networkFailure();
      }
    });
    e.target.complete();
  }


  async readNews(imageUrl, content, titleHead, url, timeValue, from) {
    const mymodal = await this.modal.create({
        component: NewsModalComponent,
        backdropDismiss: false,
        componentProps: {
          image: imageUrl,
          news: content,
          title: titleHead,
          sourceUrl: url,
          time: timeValue,
          author: from
        },
        animated: true
      });

    return await mymodal.present();

  }

  async loading() {
    const loader = await this.loader.create({
      spinner: 'crescent',
      message: 'Please wait...',
      backdropDismiss: false
    });

    return await loader.present();
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

  async presentPopover(ev: any) {
    const popover = await this.popover.create({
      component: PopoverComponent,
      backdropDismiss: true,
      showBackdrop: false,
      event: ev,
      animated: true,
      cssClass: 'customPop'
    });

    return await popover.present();
  }

  userProfile(event: any) {
    this.presentPopover(event);
  }

  async networkFailure() {
    const networkStatus = await this.alert.create({
      header: 'Network Error',
      message: 'Please check your internet connection.',
      backdropDismiss: false,
      animated: true,
      buttons: [
        {
          text: 'Retry!',
          handler: () => {
            this.getNews(this.country);
          }
        }
      ]
    });

    return await networkStatus.present();
  }
              // addNews(url: string, title: string, img: string ) {
              //   this.databaseService.addNews(url, title, img);
              //   this.addedNews();
              // }
}
