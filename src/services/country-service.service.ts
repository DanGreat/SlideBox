import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  private countrySource = new Subject<string>();
  country$ = this.countrySource.asObservable();
  constructor() { }

  setCountry(country) {
    this.countrySource.next(country);
  }
}
