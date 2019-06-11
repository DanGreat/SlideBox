import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-my-news',
  templateUrl: './my-news.page.html',
  styleUrls: ['./my-news.page.scss'],
})
export class MyNewsPage implements OnInit {

  newsList: any[] = [];

  constructor(private databaseService: DatabaseService
) { }

  ngOnInit() {
     this.databaseService.getDatabaseState().subscribe(isReady => {
       if (isReady) {
        this.loadNews();
       }
     });
  }

  loadNews() {
    this.databaseService.getAllNews().then(res => {
      this.newsList = res;
      console.log(res);
      console.table(res);
    });
  }

  deleteNews(id) {
    this.databaseService.deleteNews(id);
  }
}
