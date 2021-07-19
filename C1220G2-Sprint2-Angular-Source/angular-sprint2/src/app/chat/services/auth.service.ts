import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<User>;
  private authState: any;

  constructor( private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) {
      this.user = afAuth.authState;
  }

  authUser() {
    return this.user;
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.authState = userCredential.user;
        const status = 'online';
        this.setUserData(email, displayName, status);
      }).catch(error => console.log(error));
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            this.authState = userCredential.user;
            this.setUserStatus("online");
            this.router.navigate(['']);
          });
  }

  currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  setUserData(email: string, displayName: string, status: string) {
    const path = `users/${this.currentUserId()}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };
    this.db.object(path).update(data).catch(error => console.log(error));
  }

  setUserStatus (status: string) {
    const path = `users/${this.currentUserId()}`;
    const data = {
      status: status
    };
    this.db.object(path).update(data).catch(error => console.log(error));
  }
}
