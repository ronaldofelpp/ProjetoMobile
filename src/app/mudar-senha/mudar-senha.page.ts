import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-mudar-senha',
  templateUrl: './mudar-senha.page.html',
  styleUrls: ['./mudar-senha.page.scss'],
})
export class MudarSenhaPage implements OnInit {
  userEmail: string='';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe(user=> {
      if (user) {
        this.userEmail = user.email;
      } else {
        console.log('Erro ao achar email de usuário logado');
        
      }
    });
  }

  async sendPasswordReset() {
    try {
      await this.authService.sendPasswordResetEmail(this.userEmail);
      console.log('Email de redefinição de senha enviado.');
    } catch (error) {
      console.log('Erro ao enviar email de recuperação de senha');
    }
  }

}
