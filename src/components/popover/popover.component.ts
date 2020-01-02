import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  popoverList: any;

  constructor(private route: Router, private popCtrl: PopoverController,
              private userAuth: AngularFireAuth) {
    this.popoverList = [
      {icon: 'person', list: 'View Profile', page: 'profile'},
      {icon: 'power', list: 'Logout', page: 'signup'},
    ];
   }

  ngOnInit() {}

  goto(page: any) {
    // A switch statement would be prefered once there are more than 2 arguments
    if (page === 'signup') {
      this.popCtrl.dismiss();
      this.userAuth.auth.signOut().then(() => {
        this.route.navigate([page]);
      });
    } else {
      this.popCtrl.dismiss();
      this.route.navigate([page]);
    }
  }
}
