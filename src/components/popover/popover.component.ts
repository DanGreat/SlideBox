import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { countries } from 'src/app/countries';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { CountryServiceService } from 'src/services/country-service.service';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  popoverList: any;
  allCountries = countries;
  selectedCountry = 'ng';

  constructor(private route: Router, private popCtrl: PopoverController,
              private userAuth: AngularFireAuth, private countryService: CountryServiceService,
              private storage: NativeStorage) {
    this.popoverList = [
      {icon: 'person', list: 'View Profile', page: 'profile'},
      {icon: 'power', list: 'Logout', page: 'signup'},
    ];
    // Get value from native storage instead
    this.selectedCountry = localStorage.getItem('COUNTRY');
   }

  ngOnInit() {
  }

  goto(page: string,) {
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


  selectCountry(event) {
    this.selectedCountry = event.detail.value;
    this.countryService.setCountry(this.selectedCountry);
    // this.storage.setItem('COUNTRY', this.selectedCountry);
    // Set value to native storage instead
    localStorage.setItem('COUNTRY', this.selectedCountry);
  }
}
