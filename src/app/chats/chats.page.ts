import { Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  @ViewChild('changeTab') changeTab;
  tabTitle;

  constructor() { }

  ngOnInit() {
  }

  selected(ev: any) {
    let firstLetter = ev['tab'].charAt(0).toUpperCase();
    let remaining = ev['tab'].slice(1);
    const title = firstLetter + remaining;
    this.tabTitle = title;
  }

}
