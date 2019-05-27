import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  firstName;
  constructor(private modal: ModalController, private route: ActivatedRoute, private nav: NavParams) { }

  ngOnInit() {
    this.firstName = this.nav.get('userProfile');
    console.log(this.firstName);
  }

  saveProfile() {
    this.modal.dismiss();
  }
}
