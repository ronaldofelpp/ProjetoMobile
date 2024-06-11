import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userPassword: string ='';
  userEmail: string='';
  initialUserPassword: string='';
  initialUserEmail: string='';
  isFormChanged: boolean = false;

  constructor(private router: Router, private themeService: ThemeService,) {
  }

  ngOnInit(){
    this.initialUserPassword = 'Nome do Usuário';
    this.initialUserEmail = 'email@usuario.com';
    this.userPassword = this.initialUserPassword;
    this.userEmail = this.initialUserEmail;
  }

  onInputChange() {
    this.isFormChanged = (this.userEmail !== this.initialUserEmail);
  }

  updateUserData() {
    // Lógica para atualizar os dados do usuário (a implementar)
    console.log('Atualizando dados do usuário...');
    this.initialUserPassword = this.userPassword;
    this.initialUserEmail = this.userEmail;
    this.isFormChanged = false;
  }

  changePassword() {
    this.router.navigate(['/change-password']);
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

}
