import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { IonSlide, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('slides') slides: IonSlides;

  showSkip = true;
  slideOptions = {
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    }
  };

  image1 = 'assets/intro1.png';
  image2 = 'assets/intro2.png';
  image3 = 'assets/intro3.png';
  image4 = 'assets/intro4.png';

  constructor(private route: Router) {}

  getStarted() {
    this.route.navigate(['signup']);
  }

  onSlideChangeStart(ev){
    ev.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }
}
