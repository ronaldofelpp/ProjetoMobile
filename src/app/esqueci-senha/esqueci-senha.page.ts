import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.page.html',
  styleUrls: ['./esqueci-senha.page.scss'],
})
export class EsqueciSenhaPage implements OnInit {
  email: string = '';

  constructor(private authService: AuthService) { }

  async sendPasswordReset() {
    try {
      await this.authService.sendPasswordResetEmail(this.email);
      console.log('Email de redefinição de senha enviado.');
    } catch (error) {
      console.log('Erro ao enviar email de recuperação de senha');
    }
  }

  ngOnInit() {
  }

}
