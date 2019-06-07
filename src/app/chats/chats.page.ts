import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  tabTitle: string = 'Chats';
  constructor() { }

  ngOnInit() {
  }

  selected(ev: any) {
  this.tabTitle = ev.tab;

  }

}
