import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-my-news',
  templateUrl: './my-news.page.html',
  styleUrls: ['./my-news.page.scss'],
})
export class MyNewsPage implements OnInit {

  noNews = true;
  image: any[] = [];
  title: string;
  newsList: any[] = [];

  constructor(private activeRoute: ActivatedRoute,
              private route: Router,
              private storge: NativeStorage) { }

  ngOnInit() {
     // this.storge.getItem('userNews').then(data =>
      //   console.log(`'Usernews data: ' ${data}`),
      //   error => console.log(error + " cant get data")
      // );
      if (this.activeRoute.snapshot.paramMap.has('img') && this.activeRoute.snapshot.paramMap.has('title')){
        this.activeRoute.params.subscribe((response) => {
          this.newsList.push(response);
          this.noNews = false;
          this.image.push(decodeURIComponent(this.newsList[0].img));
        });
      }
    }

}
