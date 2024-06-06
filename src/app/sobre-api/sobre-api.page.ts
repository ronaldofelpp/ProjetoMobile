import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-sobre-api',
  templateUrl: './sobre-api.page.html',
  styleUrls: ['./sobre-api.page.scss'],
})
export class SobreAPIPage implements OnInit {

  constructor(private platform: Platform) { }

  ngOnInit() {
  }
  
  openNewsAPISite() {
    this.platform.ready().then(() => {
      window.open('https://newsapi.org/', '_blank');
    });
  }

  openOpenWeatherSite() {
    this.platform.ready().then(() => {
      window.open('https://openweathermap.org/', '_blank');
    });
  }

  openGeolocationSite() {
    this.platform.ready().then(() => {
      window.open('https://ionicframework.com/docs/native/geolocation', '_blank');
    });
  }
}


