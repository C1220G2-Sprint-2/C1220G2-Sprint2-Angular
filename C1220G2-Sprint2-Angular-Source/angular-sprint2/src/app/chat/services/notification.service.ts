import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messaging = firebase.messaging();
  private messageSource = new Subject();
  currentMessage = this.messageSource.asObservable();

  constructor( private afs: AngularFirestore) { 
  }

  // get permission to send messages
  getPermission(user) {
    this.messaging.getToken({vapidKey: 'BD2F2YT9MI22v1LUP7JcvPzne8-2G7ZIMNjYKlC_HrDN-9QMzpBZQmOO3fN1Qf3VQfe3Ayg5g-IPVfSeCqhFBSM'})
    .then((currentToken) => {
      if (currentToken) {
        console.log('Notification permission granted.');
        console.log("current token: " + currentToken);
        this.saveToken(user, currentToken);
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  }

  // Listen for token refresh
  monitorRefresh(user) {
    this.messaging.onTokenRefresh(() => {
      this.messaging.getToken()
      .then(refreshedToken => {
        console.log('Token refreshed.');
        this.saveToken(user, refreshedToken)
      })
      .catch( err => console.log(err, 'Unable to retrieve new token') )
    });
  }

   // save the permission token in firestore
   private saveToken(user, token): void {
    
    const currentTokens = user.fcmTokens || { };
    console.log(currentTokens, token);

    // If token does not exist in firestore, update db
    if (!currentTokens[token]) {
      const userRef = this.afs.collection('users').doc(user.uid)
      const tokens = { ...currentTokens, [token]: true }
      userRef.update({ fcmTokens: tokens })
    }
}

  getMessagingToken() {
  }
}
