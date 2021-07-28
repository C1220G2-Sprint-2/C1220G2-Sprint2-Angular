import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { FirebaseUser } from 'src/app/models/firebase-user.model';
import { GroupUser } from 'src/app/models/group-user.model';
import { User } from 'src/app/models/user.model';
import { FirebaseAuthService } from '../services/firebaseAuth.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {

  @Input() groupName: string;
  usersInGroup: string[] = [];
  groupsUsers: GroupUser[];
  users: FirebaseUser[] = [];
  currentUser: User;
  @Input() doUpdateUsersInGroup: boolean;

  constructor( private chatService: ChatService, private authService: FirebaseAuthService ) {
  }

  ngOnChanges() {
    // console.log("doUpdateUsersInGroup: " + this.doUpdateUsersInGroup);
    this.authService.authUser().subscribe((user: User) => {
      this.currentUser = user;
      this.getUsersInGroup();
    });
  }

  ngOnInit(): void {
    this.authService.authUser().subscribe((user: User) => {
      this.currentUser = user;
      this.getUsersInGroup();
    });
  }

  getUsersInGroup() {
    this.chatService.getGroupsUsers().subscribe(data => {
      if (this.usersInGroup.length > 0) this.usersInGroup = [];
      this.groupsUsers = data;
      // console.log("Group user: " + this.groupsUsers);
      this.groupsUsers.forEach(e => {
        if (e.groupName === this.groupName) {
          this.usersInGroup.push(e.userEmail);
        }
      });
    });

    this.chatService.getUsers().subscribe((userList: FirebaseUser[]) => {
      if (this.users.length > 0) this.users = []; 
      // console.log("User list: " + userList);
      userList.forEach(user => {
        if (this.usersInGroup.includes(user.email)) {
          this.users.push(user);
        }
      });
    });
  }
}
