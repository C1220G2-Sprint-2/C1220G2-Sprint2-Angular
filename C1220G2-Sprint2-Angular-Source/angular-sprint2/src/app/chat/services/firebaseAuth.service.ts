import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from 'src/app/models/user.model';
import { FirebaseUser } from 'src/app/models/firebase-user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  private user: Observable<User>;
  private authState: any;

  private usersRef: AngularFireList<FirebaseUser>;
  private users: Observable<FirebaseUser[]>;

  constructor( private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) {
      this.user = afAuth.authState;
      
      this.usersRef = this.db.list('users');
      // Use snapshotChanges().map() to store the key
      this.users = this.usersRef.snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      )
  }

  authUser() {
    return this.user;
  }

  async signUp(email: string, password: string, avatar: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.authState = userCredential.user;
      const status = 'online';
      this.setUserData(email, avatar, status);
    } catch (error) {
      return console.log(error);
    }
  }

  async login(email: string, password: string) {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.authState = userCredential.user;
    // console.log("authState uid: " + this.authState.uid);
    // console.log("firebase login: " + this.authState);
    this.setUserStatus("online");
    return userCredential;
  }

  signOut() {
    this.authUser().subscribe((authUser: User) => {
      // console.log("log out user key: " + authUser.uid);
      const path = `users/${authUser.uid}`;
      const data = {
        status: "offline"
      };
    this.db.object(path).update(data)
      .then(() => this.afAuth.signOut)
      .catch(error => console.log(error));
    });
  }

  currentUserId(): string {
    // console.log("Auth stage: " + this.authState);
    return this.authState !== null ? this.authState.uid : '';
  }

  setUserData(email: string, avatar: string, status: string) {
    const path = `users/${this.currentUserId()}`;
    const data = {
      email: email,
      avatar: avatar,
      status: status
    };
    this.db.object(path).update(data).catch(error => console.log(error));
  }

  setUserStatus (status: string) {
    // console.log("auth stage: " + this.authState);
    // console.log("UID: " + this.currentUserId());
    const path = `users/${this.currentUserId()}`;
    const data = {
      status: status
    };
    this.db.object(path).update(data).catch(error => console.log(error));
  }
}
