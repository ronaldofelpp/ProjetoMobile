import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation';


@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  private apiKey = 'your_api_key';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  async getGeolocation(): Promise<{ lat: number, lon: number }> {
    const position = await Geolocation.getCurrentPosition();
    return {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };
  }
  
  getWeather(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`);
  }

}

