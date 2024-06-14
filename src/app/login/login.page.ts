import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string='';
  password:string='';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login(this.email, this.password);
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

}
