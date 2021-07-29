import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatMessage } from 'src/app/models/chat-message.model';
import { GroupChat } from 'src/app/models/group-chat.model';
import { GroupUser } from 'src/app/models/group-user.model';
import { User } from 'src/app/models/user.model';
import { FirebaseUser } from 'src/app/models/firebase-user.model';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;

  // chatMessages: AngularFireList<ChatMessage[]>;
  // chatMessage: ChatMessage;

  messagesRef: AngularFireList<ChatMessage>;
  messages: Observable<ChatMessage[]>;
  // username: string;
  userAvatar: string;

  // firebase groups
  groupsRef: AngularFireList<GroupChat>;
  groups: Observable<GroupChat[]>;

  // firebase group user
  groupUserRef: AngularFireList<GroupUser>;
  groupUsers: Observable<GroupUser[]>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  )
  {
    this.messagesRef = db.list('messages');
    // Use snapshotChanges().map() to store the key
    this.messages = this.messagesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    )

    this.groupsRef = db.list('groups');
    this.groups = this.groupsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    );

    this.groupUserRef = db.list<GroupUser>('groups-users');
    this.groupUsers = this.groupUserRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    );

    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }

      // this.getUser().subscribe((currentUser: FirebaseUser) => this.userAvatar = currentUser.avatar);
    })
  }

  getUser(): Observable<any> {
    const useId = this.user.uid;
    const path = `/users/${useId}`;
    return this.db.object(path).valueChanges();
  }

  getUsers(): Observable<FirebaseUser[]> {
    return this.db.list<FirebaseUser>('/users').valueChanges();
  }

  sendMessage(msg: string, groupName: string): any {
    const timestamp: string = this.getTimeStamp();
    const email: string = this.user.email;
    this.getUser().subscribe((currentUser: FirebaseUser) => {
      this.userAvatar = currentUser.avatar;

      const value = {
        email: email,
        groupName: groupName,
        // userName: this.user.username,
        userAvatar: this.userAvatar,
        message: msg,
        timeSend: timestamp
      };
      const convertedEmail = email.replace(/\./g, '');
      const key = groupName + '+' + convertedEmail + '+' + timestamp;

      const promise = this.messagesRef.update(key, value);
      return promise;
    });

    
    // console.log("msg email: " + email);
    // console.log("msg group name: " + groupName);
    // console.log("msg avatar: " + this.userAvatar);
  }

  removeMessage(key: string): any {
    const promise = this.messagesRef.remove(key);
    return promise;
  }

  getMessages(): Observable<ChatMessage[]> {
    // return this.db.list('/messages', ref => ref.orderByChild('timeSend').limitToLast(10)).valueChanges();
    return this.db.list('/messages', ref => ref.orderByChild('timeSend')).valueChanges();
  }


  // getTimeStamp(): string {
  //   const now = new Date();
  //   const date = now.getUTCFullYear() + '/' +
  //     (now.getUTCMonth() + 1) + '/' +
  //     now.getUTCDate();

  //   const time = now.getUTCHours() + ':' +
  //     now.getUTCMinutes() + ':' +
  //     now.getUTCSeconds();

  //   return date + ' ' + time;
  // }
  getTimeStamp(): string {
    const now = new Date();
    return now.toString();
  }

  createGroup(name: string): any {
    return this.groupsRef.push(
      {
        owner: this.user.email,
        groupName: name
      }
    );
  }

  createGroupUser(groupName: string, userEmail: string): any {
    // const promise = this.groupUserRef.push(
    //   {
    //     groupName: groupName,
    //     userEmail: userEmail
    //   }
    // );
    const value = {
      groupName: groupName,
      userEmail: userEmail
    }
    let convertedEmail = userEmail.replace(/\./g, '');
    const key = groupName + '+' + convertedEmail;
    // console.log("key: " + key);
    const promise = this.groupUserRef.update(key, value);
    return promise;
  }

  getGroupsUsers(): Observable<GroupUser[]> {
    return this.db.list<GroupUser>('/groups-users').valueChanges();
  }

  removeGroupUser(key: string): any {
    const promise = this.groupUserRef.remove(key);
    return promise;
  }

  getGroups(): Observable<GroupChat[]> {
    return this.db.list<GroupChat>('/groups').valueChanges();
  }
  
}
