import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  public mensagem:string='';
  saudacao(){
    const agora = new Date();
    const horas = agora.getHours();
  
    if (horas >= 4 && horas < 12) {
      this.mensagem = "Bom dia, ";
    } else if (horas >= 12 && horas < 19) {
      this.mensagem = "Boa tarde, ";
    } else {
      this.mensagem = "Boa noite, ";
    }
  }

  constructor() {
    this.saudacao();
  }

}
