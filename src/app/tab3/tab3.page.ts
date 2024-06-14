import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userEmail: string='';
  initialUserEmail: string='';
  isFormChanged: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(){
    this.authService.user$.subscribe(user=> {
      if (user) {
        this.userEmail = user.email
        this.initialUserEmail = user.email
      } else {
        this.initialUserEmail = '';
      this.userEmail = '';
      }
    });
  }

  onInputChange() {
    this.isFormChanged = (this.userEmail !== this.initialUserEmail);
  }

  async updateUserData() {
    try {
      await this.authService.updateEmail(this.userEmail);
      this.initialUserEmail = this.userEmail;
      this.isFormChanged = false;
      console.log('Email do usuário atualizado com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar o email do usuário: ', error);
    }
  }

  changePassword() {
    this.router.navigate(['/change-password']);
  }

}
