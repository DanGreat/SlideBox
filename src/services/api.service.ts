import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) {}  

  async popularNews(page: number){
    await this.http.get(`https://newsapi.org/v2/top-headlines?country=ng&pageSize=8&page=${page}&apiKey=4f6e3e854d414e3b92fdac5c96c04102`)
    .subscribe((response) => {
      console.log(response);
      return response;
     });
  }

  loadMoreAndCategory(page: number, category: string){
    if(category){
     
    }else{
      return this.http.get(`https://newsapi.org/v2/top-headlines?country=ng&pageSize=5&page=${page}&apiKey=4f6e3e854d414e3b92fdac5c96c04102`)
      .subscribe((response) => {
        return Array<any>(response);
      });
    }
  }



}
