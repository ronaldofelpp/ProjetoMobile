import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from '../openWeather/open-weather.service';
import { NewsAPIService } from '../newsAPI/news-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  mensagem: string = 'Atualizando...';
  temperature: string ='';
  rainProbability: string ='';
  iconName: string ='';
  currentTime: string ='';
  city: string ='';
  state: string ='';
  topNews: any[] = [];

  ngOnInit() {
    this.updateWeather();
    setInterval(() => this.updateWeather(), 360000); // a cada 6 minutos
    setInterval(() => this.updateTime(), 1000); // atualiza o tempo a cada segundo
    this.carregaNoticiasPopulares();
  }

  constructor(private openWeather: OpenWeatherService, private newsApi: NewsAPIService) {
    this.bemVindo();
  }

  carregaNoticiasPopulares() {
    this.newsApi.getTopNews('us','en').subscribe(data => {
      this.topNews = data.articles;
    });
  }

  refreshNews(event:any) {
    this.newsApi.getTopNews('us','en').subscribe(data => {
      this.topNews = data.articles;
      event.target.complete();
  });}

  updateWeather() {
    this.openWeather.getGeolocation().then((position: { lat: any; lon: any; }) => {
      const lat = position.lat;
      const lon = position.lon;
      this.openWeather.getWeather(lat, lon).subscribe((data: { name: string; sys: { country: string; }; main: { temp: any; }; clouds: { all: any; }; weather: { icon: any; }[]; }) => {
        this.city = data.name;
        this.state = data.sys.country;
        this.temperature = `${data.main.temp}°C`;
        this.rainProbability = `${data.clouds.all}% de probabilidade chuva`;
        this.iconName = this.mapIcon(data.weather[0].icon);
        this.mensagem = ''; // limpa a mensagem de atualização
      });
    }).catch((err: any) => {
      this.mensagem = 'Erro ao obter localização';
    });
  }
  updateTime() {
    const now = new Date();
    this.currentTime = `${now.getHours()}:${now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()}`;
  }

  mapIcon(icon: string): string {
    const iconMap: {[key: string]: string} = {
      '01d': 'sunny',
      '01n': 'moon',
      '02d': 'partly-sunny',
      '02n': 'cloudy-night',
      '03d': 'cloudy',
      '03n': 'cloudy',
      '04d': 'cloudy',
      '04n': 'cloudy',
      '09d': 'rainy',
      '09n': 'rainy',
      '10d': 'rainy',
      '10n': 'rainy',
      '11d': 'thunderstorm',
      '11n': 'thunderstorm',
      '13d': 'snow',
      '13n': 'snow',
      '50d': 'fog',
      '50n': 'fog'
    };
    return iconMap[icon] || 'cloudy';
  }

  
  public saudacao:string='';
  bemVindo(){
    const agora = new Date();
    const horas = agora.getHours();
  
    if (horas >= 4 && horas < 12) {
      this.saudacao = "Bom dia, ";
    } else if (horas >= 12 && horas < 18) {
      this.saudacao = "Boa tarde, ";
    } else {
      this.saudacao = "Boa noite, ";
    }
  }

}
