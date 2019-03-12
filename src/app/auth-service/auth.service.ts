import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {Router} from '@angular/router';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  private readonly userKey = 'user';

  constructor(private afAuth: AngularFireAuth,
              private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem(this.userKey, JSON.stringify(this.user));
      } else {
        localStorage.setItem(this.userKey, null);
      }
    });
  }

  async login(email: string, password: string): Promise<UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem(this.userKey);
    this.router.navigate(['home']);
  }

  async signUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem(this.userKey)) !== null;
  }
}
