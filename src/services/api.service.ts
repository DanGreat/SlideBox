import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CountryServiceService } from 'src/services/country-service.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private API_KEY: any = '4f6e3e854d414e3b92fdac5c96c04102';

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient, private countryService: CountryServiceService) {}



  popularNews(page: number, country: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=8&page=${page}&apiKey=4f6e3e854d414e3b92fdac5c96c04102`, this.httpOption);
  }

  loadCategoryNews(page: number, category: string, country: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=8&page=${page}&apiKey=${this.API_KEY}`);

  }



}
