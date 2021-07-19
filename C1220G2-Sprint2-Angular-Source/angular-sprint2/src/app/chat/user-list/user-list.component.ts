import { Component, Input, OnInit } from '@angular/core';
import { FirebaseUser } from 'src/app/models/firebase-user.model';
import { GroupUser } from 'src/app/models/group-user.model';
import { User } from 'src/app/models/user.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  // users: FirebaseUser[];
  users: User[] = [];
  @Input() groupName: string;
  usersInGroup: string[] = [];
  groupsUsers: GroupUser[];

  constructor( private chatService: ChatService ) {
    // chatService.getUsers().subscribe((userList) => {
    //   this.users = userList;
    // });
    
  }

  ngOnInit(): void {
    this.chatService.getGroupsUsers().subscribe(data => {
      this.groupsUsers = data;
      this.groupsUsers.forEach(e => {
        if (e.groupName === this.groupName) {
          this.usersInGroup.push(e.userEmail);
        }
      });
    });

    this.chatService.getUsers().subscribe(userList => {
      userList.forEach(user => {
        if (this.usersInGroup.includes(user.email)) {
          this.users.push(user);
        }
      })
    });
  }

}
