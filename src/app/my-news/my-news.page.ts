import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-news',
  templateUrl: './my-news.page.html',
  styleUrls: ['./my-news.page.scss'],
})
export class MyNewsPage implements OnInit {

  noNews: boolean = true;
  image: string;
  title: string;
  data: any;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((response) => {
     this.data = Array<any>(response);
     this.noNews = false;
    });
  }

}
