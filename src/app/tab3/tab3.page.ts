import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userName: string ='';
  userEmail: string='';
  initialUserName: string='';
  initialUserEmail: string='';
  isFormChanged: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(){
    this.initialUserName = 'Nome do Usuário';
    this.initialUserEmail = 'email@usuario.com';
    this.userName = this.initialUserName;
    this.userEmail = this.initialUserEmail;
  }

  onInputChange() {
    this.isFormChanged = (this.userName !== this.initialUserName || this.userEmail !== this.initialUserEmail);
  }

  updateUserData() {
    // Lógica para atualizar os dados do usuário (a implementar)
    console.log('Atualizando dados do usuário...');
    this.initialUserName = this.userName;
    this.initialUserEmail = this.userEmail;
    this.isFormChanged = false;
  }

  changePassword() {
    this.router.navigate(['/change-password']);
  }


  

}
