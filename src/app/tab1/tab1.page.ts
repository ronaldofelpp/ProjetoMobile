import { Component, OnInit, viewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NewsAPIService } from '../newsAPI/news-api.service';
import { IonContent } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [NewsAPIService]
})

export class Tab1Page {
  
  @ViewChild(IonContent)
  content!: IonContent;

  constructor(private authService: AuthService, private newsAPIService: NewsAPIService, private loadingCtrl: LoadingController) {}

  public articles = new Array<any>();
  public category = 'general';
  public page = 1;

  efeitoRefresh(event: any) {
    this.page = 1;
    this.carregarNoticias();
    console.log('Iniciando operação assíncrona');

    setTimeout(() => {
      event.target.complete();
      console.log('Finalizando refresh');
    }, 500);
  }

  scrollInfinito(event: any) {
    this.page++;
    this.carregarNoticias();
    setTimeout(() => {
      event.target.complete();
    }, 3000);
  }

  ionViewDidEnter() {
    this.showLoading();
    this.carregarNoticias();
  }

  carregarNoticias() {
    this.newsAPIService.getNews(this.category,'us', this.page,'en').subscribe(
      (data) => {
        let resposta = data as any;
        let filteredArticles = resposta.articles.filter((article: any) => article.urlToImage);
        if (this.page === 1) {
          this.articles = filteredArticles;
        } else {
          this.articles = this.articles.concat(filteredArticles);
        }
        console.log(this.articles);
      },
      (error) => {
        console.log('Error ao carregar notícias:', error);
      }
    );
  }

  mudancaCategoria(event: any) {
    this.category = event.detail.value;
    this.page = 1;
    this.showLoading();
    this.scrollToTop();
    this.carregarNoticias();
  }

  
  scrollToTop() {
    this.content.scrollToTop(500);
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      duration: 50,
  });

    loading.present();
  }

  onLogout(){
    this.authService.logout();
  }
}
  
  

  
