import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { async } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // @ViewChild(Slides) mySlide: Slides;

  slideOptions = {
    loop: false
  };

  image1 = 'assets/intro4.svg';
  image2 = 'assets/intro2.svg';
  image3 = 'assets/intro3.svg';
  image4 = 'assets/intro1.svg';

  constructor(private route: Router) {}


  getStarted() {
    this.route.navigate(['signup']);
  }
}
