import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  popoverList: any;

  constructor(private route: Router, private popCtrl: PopoverController) {
    this.popoverList = [
      {icon: 'person', list: 'View Profile', page: 'profile'},
      {icon: 'power', list: 'Logout', page: 'signup'},
    ];
   }

  ngOnInit() {}

  goto(page: any) {
    this.popCtrl.dismiss();
    this.route.navigate([page]);
  }
}
