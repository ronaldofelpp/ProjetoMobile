import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private angularAuth: AngularFireAuth, private angularStore: AngularFirestore, private router: Router) { 
    this.angularAuth.authState.subscribe(user => {
      this.userSubject.next(user);
    });
  }
    //login com email e senha normal
    async login(email: string, password: string) {
      try {
        const userCredential = await this.angularAuth.signInWithEmailAndPassword(email, password);
        this.userSubject.next(userCredential.user)
        this.router.navigate(['/tabs/tab1']); 
      } catch (error) {
        console.error('Erro ao fazer login: ', error);
      }
    }
    
    //login com google
    async loginWithGoogle() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const userCredential = await this.angularAuth.signInWithPopup(provider);
        this.userSubject.next(userCredential.user);
        this.router.navigate(['/tabs/tab1']);
      } catch (error) {
        console.error('Erro ao fazer login com Google: ', error);
      }
    }

    async register(email: string, password: string) {
      const result = await this.angularAuth.createUserWithEmailAndPassword(email, password);
      this.userSubject.next(result.user);
      return result.user;
    }

    //deslogar usuario
    async logout() {
      try {
        await this.angularAuth.signOut();
        this.userSubject.next(null);
        this.router.navigate(['/login']); // Redireciona para a página de login após o logout
      } catch (error) {
        console.error('Erro ao fazer logout: ', error);
        // Lida com erros, como exibir uma mensagem ao usuário
      }
    }

    //atualizar email do usuario
    async updateEmail(newEmail: string) {
      const user = await this.angularAuth.currentUser;
      if (user) {
        await user.updateEmail(newEmail);
        this.userSubject.next(user); // Atualiza o BehaviorSubject
      } else {
        throw new Error('No user is currently logged in');
      }
    }

    //pegar o usuario logado
    getUser() {
      return this.angularAuth.currentUser;
    }

    
}
