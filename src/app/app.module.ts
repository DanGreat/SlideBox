import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Network } from '@ionic-native/network/ngx';

//Firebase database connection
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './credentials';

//Form validations
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Database service using SQLite
import { DatabaseService } from '../services/database.service';
import { BookmarkService } from '../services/bookmark.service';
import { APIService } from '../services/api.service';

//Search API
import { IonicSelectableModule } from 'ionic-selectable';
import { ExpandableHeaderDirective } from './expandable-header.directive';


@NgModule({
  declarations: [AppComponent, ExpandableHeaderDirective],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    IonicSelectableModule
    
  ],
  providers: [
    SQLite,
    SQLitePorter,
    DatabaseService,
    File,
    FileChooser,
    InAppBrowser,
    NativeStorage,
    StatusBar,
    SplashScreen,
    PhotoViewer,
    Network,
    BookmarkService,
    APIService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

