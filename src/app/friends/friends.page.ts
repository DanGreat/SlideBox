import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import * as firestore from 'angularfire2';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  text;
  chatRef;
  uid;

  constructor(private userAuth: AngularFireAuth,
              private userStore: AngularFirestore,
              private storage: NativeStorage) { 
              this.uid = localStorage.getItem('userId');
            //this.uid = this.storage.getItem('userId');
              this.chatRef = this.userStore.collection('Chats', ref => ref.orderBy('Timestamp')).valueChanges();
              }

  ngOnInit() {
  }

  sendMessage() {
    if (this.text !== '') {
      this.userStore.collection('Chats').add({
        Name: this.userAuth.auth.currentUser.displayName,
        Message: this.text,
        UserId: this.userAuth.auth.currentUser.uid
      });
      this.text = '';
    }
  }
}
