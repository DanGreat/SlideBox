import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(private http: HttpClient,
              private sqlPorter: SQLitePorter,
              private sql: SQLite,
              private storage: NativeStorage,
              private platform: Platform) {
                // this.databaseReady = new BehaviorSubject(false);

                // this.platform.ready().then(() => {
                //   this.sql.create({
                //     name: 'news.db',
                //     location: 'default'
                //   }).then((db) => {
                //     console.log('Created Db: ', db);
                //     this.database = db;
                //     this.storage.getItem('databaseFilled').then(val => {
                //       if (val) {
                //         this.databaseReady.next(true);
                //       } else {
                //         this.fillDatabase();
                //       }
                //     });
                //   });
                // });
              }

  // fillDatabase() {
  //   this.http.get('assets/news.sql').subscribe(sql => {
  //     console.log('SQL to insert: ', sql);
  //     this.sqlPorter.importSqlToDb(this.database, sql.toString()).then(data => {
  //       this.databaseReady.next(true);
  //       this.storage.setItem('databaseFilled', true);
  //     }).catch(err => console.log(err));
  //   });
  // }

  // getDatabaseState() {
  //   return this.databaseReady.asObservable();
  // }

  // addNews(url, title, img) {
  //   const newsData = [url, title, img];
  //   this.database.executeSql('INSERT INTO news (newsUrl, newsTitle, newsImg) VALUES (?, ?, ?)', newsData).then(res => {
  //     console.log('Added response: ', res);
  //     return res;
  //   });
  // }

  // getAllNews() {
  //   return this.database.executeSql('SELECT * FROM news').then(data => {
  //     const newsData = [];
  //     if (data.rows.length > 0) {
  //       for (let index = 0; index < data.rows.length; index++) {
  //         newsData.push({url: data.rows.item(index).newsUrl, title: data.rows.item(index).newsTitle, img: data.rows.item(index).newsImg });
  //       }
  //     }
  //     return newsData;
  //   }, err => {
  //     console.log('Error getting news from database: ', err);
  //     return [];
  //   });
  // }

  // deleteNews(id) {
  //   return this.database.executeSql('DELETE FROM news WHERE id = ?', [id]);
  // }
}
