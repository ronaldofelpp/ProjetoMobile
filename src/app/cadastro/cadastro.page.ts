import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { FeedbackMessageService } from '../feedbackMessage/feedback-message.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  email: string='';
  password: string='';
  confirmPassword: string='';

  constructor(private authService: AuthService, private alertController: AlertController, private router: Router, private feedbackMessage: FeedbackMessageService) { }

  async passTry() {
    if (this.password !== this.confirmPassword) {
      this.feedbackMessage.showToast('As senhas não coincidem' , 'danger');
      return;
  }
  try {
    const user = await this.authService.register(this.email, this.password);

    const alert = await this.alertController.create({
      header: 'USUÁRIO CADASTRADO',
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
    this.feedbackMessage.showToast('Erro ao enviar email de recuperação' + this.getErrorMessage(error), 'danger');
  }
  }
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Ocorreu um erro desconhecido.';
  }
  
  ngOnInit() {
  }

}
