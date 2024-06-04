import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularAuth: AngularFireAuth, private angularStore: AngularFirestore, private router: Router) { }

    async login(email: string, password: string) {
      try {
        await this.angularAuth.signInWithEmailAndPassword(email, password);
        this.router.navigate(['/tabs/tab1']); 
      } catch (error) {
        console.error('Erro ao fazer login: ', error);
      }
    }

    async logout() {
      try {
        await this.angularAuth.signOut();
        this.router.navigate(['/login']); // Redireciona para a página de login após o logout
      } catch (error) {
        console.error('Erro ao fazer logout: ', error);
        // Lida com erros, como exibir uma mensagem ao usuário
      }
    }
}
