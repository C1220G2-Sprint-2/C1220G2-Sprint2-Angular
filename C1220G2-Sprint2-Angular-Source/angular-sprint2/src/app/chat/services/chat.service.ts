import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatMessage } from 'src/app/models/chat-message.model';
import { GroupChat } from 'src/app/models/group-chat.model';
import { GroupUser } from 'src/app/models/group-user.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;

  // chatMessages: AngularFireList<ChatMessage[]>;
  // chatMessage: ChatMessage;

  messagesRef: AngularFireList<ChatMessage>;
  messages: Observable<ChatMessage[]>;
  username: string;

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

      this.getUser().subscribe((currentUser) => this.username = currentUser.displayName);
    })
  }

  getUser(): Observable<any> {
    const useId = this.user.uid;
    const path = `/users/${useId}`;
    return this.db.object(path).valueChanges();
  }

  getUsers(): Observable<User[]> {
    return this.db.list<User>('/users').valueChanges();
  }

  sendMessage(msg: string, groupName: string) {
    const timestamp: string = this.getTimeStamp();
    const email: string = this.user.email;
    // this.chatMessages = this.getMessages();
    this.messagesRef.push(
      {
        email: email,
        groupName: groupName,
        userName: this.username,
        message: msg,
        timeSend: timestamp
      }
    );
  }

  getMessages(): Observable<ChatMessage[]> {
    return this.db.list('/messages', ref => ref.orderByKey().limitToLast(10)).valueChanges();
  }


  getTimeStamp(): string {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();

    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();

    return date + ' ' + time;
  }

  createGroup(name: string) {
    this.groupsRef.push(
      {
        owner: this.user.email,
        groupName: name
      }
    );
  }

  createGroupUser(groupName: string, userEmail: string) {
    this.groupUserRef.push(
      {
        groupName: groupName,
        userEmail: userEmail
      }
    )
  }

  getBelongGroups(): Observable<GroupUser[]> {
    return this.db.list<GroupUser>('/groups-users').valueChanges();
  }

  getGroupsUsers(): Observable<GroupUser[]> {
    return this.db.list<GroupUser>('/groups-users').valueChanges();
  }
  
}
