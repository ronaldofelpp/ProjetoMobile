import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  email: string='';
  password: string='';
  confirmPassword: string='';
  errorMessage: string='';

  constructor(private authService: AuthService, private alertController: AlertController, private router: Router) { }

  async passTry() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não são iguais!';
      return;
  }
  try {
    const user = await this.authService.register(this.email, this.password);

    const alert = await this.alertController.create({
      header: 'CADASTRADO',
      message: 'Você realizou seu cadastro com sucesso!',
      buttons: [
        {
          text: 'Entendido!',
          handler: () => {
            this.router.navigate(['/login'])
            
          }
        }
      ],
      cssClass: 'custom-alert'
    });
    await alert.present();
  } catch (error) {
    this.errorMessage = 'Erro ao tentar cadastrar usuário';
  }
  }
  
  ngOnInit() {
  }

}
