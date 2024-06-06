import { Component } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private authService: AuthService, private alertController: AlertController, private menuController: MenuController) {}

  closeMenu() {
    this.menuController.close();
  }

  onLogout(){
    this.authService.logout();
  }

  async confirmLogout() {

    await this.menuController.close();

    const alert = await this.alertController.create({
      header: 'SAIR',
      message: 'Você deseja realmente sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sair',
          handler: () => {
            this.onLogout();
          }
        }
      ],
      cssClass: 'custom-alert'
    });
    await alert.present();
  }

}
