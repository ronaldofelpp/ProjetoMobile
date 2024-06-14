import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat/app';
import { FeedbackMessageService } from '../feedbackMessage/feedback-message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private angularAuth: AngularFireAuth, private angularStore: AngularFirestore, private router: Router, private feedbackMessage: FeedbackMessageService) { 
    this.angularAuth.authState.subscribe(user => {
      this.userSubject.next(user);
    });
  }
    //login com email e senha normal
    async login(email: string, password: string) {
      try {
        const userCredential = await this.angularAuth.signInWithEmailAndPassword(email, password);
        this.userSubject.next(userCredential.user)
        this.router.navigate(['/tabs/tab2']); 
      } catch (error) {
        console.error('Erro ao fazer login: ', error);
        this.feedbackMessage.showToast('Erro ao fazer login: ' + this.getErrorMessage(error), 'danger');
      }
    }
    
    //login com google
    async loginWithGoogle() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const userCredential = await this.angularAuth.signInWithPopup(provider);
        this.userSubject.next(userCredential.user);
        this.router.navigate(['/tabs/tab2']);
      } catch (error) {
        console.error('Erro ao fazer login com Google: ', error);
        this.feedbackMessage.showToast('Erro ao fazer login com Google: ' + this.getErrorMessage(error), 'danger');
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
        this.feedbackMessage.showToast('Erro ao fazer logout: ' + this.getErrorMessage(error), 'danger');
        // Lida com erros, como exibir uma mensagem ao usuário
      }
    }

    //atualizar email do usuario
    async updateEmail(newEmail: string) {
      const user = await this.angularAuth.currentUser;
      if (user) {
        await user.updateEmail(newEmail);
        this.userSubject.next(user); // Atualiza o BehaviorSubject
        this.feedbackMessage.showToast('Email alterado com sucesso: ' , 'success');
      } else {
        throw new Error('No user is currently logged in');
      }
    }
    //enviar email para quem tem conta e esqueceu a senha
    async sendPasswordResetEmail(email: string) {
      try {
        await this.angularAuth.sendPasswordResetEmail(email);
        console.log('Email de redefinição de senha enviado.');
        this.feedbackMessage.showToast('Email de recuperação de senha enviado!', 'success');
      } catch (error) {
        console.error('Erro ao enviar email de redefinição de senha: ', error);
        this.feedbackMessage.showToast('Erro ao enviar email de recuperação' + this.getErrorMessage(error), 'danger');
      }
    }
    //enviar email para quem está logado e quer alterar a senha.
    async changePassword(newPassword: string) {
      const user = await this.angularAuth.currentUser;
      if (user) {
        await user.updatePassword(newPassword);
        console.log('Senha atualizada com sucesso.');
        this.feedbackMessage.showToast('Senha alterada com sucesso!' , 'success');
      } else {
        throw new Error('No user is currently logged in');
      }
    }

    //pegar o usuario logado
    getUser(): Promise<firebase.User | null> {
      return this.angularAuth.currentUser;
    }

    private getErrorMessage(error: unknown): string {
      if (error instanceof Error) {
        return error.message;
      }
      return 'Ocorreu um erro desconhecido.';
    }

    
}
