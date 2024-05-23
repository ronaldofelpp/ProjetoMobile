import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}
  
  noticia = {
    titulo:'titulo',
    subtitulo:'subtitulo',
    desc:'descriçao',
    imagem:'https://ionicframework.com/docs/img/demos/card-media.png'
  }


}
