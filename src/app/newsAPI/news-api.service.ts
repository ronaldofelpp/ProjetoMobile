import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NewsAPIService {
  private apiKey = '6691502511824e09babc9a6664c9e800'; 
  private baseUrl = 'https://newsapi.org/v2/top-headlines';


  constructor(private http: HttpClient) { }

  getNews(category: string = 'general', country: string = 'us', page: number, language: string ='pt'): Observable<any> {
    const url = `${this.baseUrl}?category=${category}&country=${country}&page=${page}&language=${language}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getTopNews(country: string = 'us', language: string = 'pt'): Observable<any> {
    const url = `${this.baseUrl}?country=${country}&language=${language}&pageSize=4&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

}
