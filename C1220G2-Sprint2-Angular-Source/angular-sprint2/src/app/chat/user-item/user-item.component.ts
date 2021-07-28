import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { FirebaseUser } from 'src/app/models/firebase-user.model';
import { GroupUser } from 'src/app/models/group-user.model';
import { User } from 'src/app/models/user.model';
import { EventEmitter } from 'stream';
import { FirebaseAuthService } from '../services/firebaseAuth.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: FirebaseUser;
  @Input() isCurrentUser: boolean;
  @Input() groupName: string;
  currentUser: User;
  
  constructor( private authService: FirebaseAuthService, 
    private chatService: ChatService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.authUser().subscribe((user: User) => {
      this.currentUser = user;
    })
    // console.log("Is current user: " + this.isCurrentUser);
  }

  getOutOfRoom() {
    this.chatService.getGroupsUsers().subscribe((groupsUsers: GroupUser[]) => {

      for (let i = 0; i < groupsUsers.length; i++) {
        if (groupsUsers[i].groupName === this.groupName
           && groupsUsers[i].userEmail === this.currentUser.email) {
          // console.log("group-user group name: " + groupsUsers[i].groupName);
          let convertedEmail = groupsUsers[i].userEmail.replace(/\./g, '');
          
          const groupUserKey = groupsUsers[i].groupName + '+' + convertedEmail;
          const promise = this.chatService.removeGroupUser(groupUserKey);
          promise
            .then(() => {
              this.router.navigateByUrl('');
              this.toastr.success("Rời khỏi phòng thành công.", "Thông Báo");
            }).catch(() => {
              console.log("remove group user fail");
            });
        }
      }
    });
  }

}
