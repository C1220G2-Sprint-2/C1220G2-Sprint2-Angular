import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { FirebaseUser } from 'src/app/models/firebase-user.model';
import { GroupUser } from 'src/app/models/group-user.model';
import { User } from 'src/app/models/user.model';
import { EventEmitter } from 'stream';
import { AuthService } from '../services/auth.service';
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
  
  constructor( private authService: AuthService, 
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
  //   console.log("(remove) current user: " + this.currentUser.email);
  //   console.log("(remove) group name: " + this.groupName);
    this.chatService.getGroupsUsers().subscribe((groupsUsers: GroupUser[]) => {
      // console.log("Group user at getOutOfRoom(): " + groupsUsers);
      for (let i = 0; i < groupsUsers.length; i++) {
        if (groupsUsers[i].groupName === this.groupName
           && groupsUsers[i].userEmail === this.currentUser.email) {
          // console.log("group-user group name: " + groupsUsers[i].groupName);
          let convertedEmail = groupsUsers[i].userEmail.replace(/\./g, '');
          // console.log("group-user user email: " + res);
          // console.log("(remove) group use id: " + groupsUsers[i].groupName + '+' + res);
          const groupUserKey = groupsUsers[i].groupName + '+' + convertedEmail;
          const promise = this.chatService.removeGroupUser(groupUserKey);
          promise
            .then(() => {
              this.chatService.getMessages().subscribe((messages: ChatMessage[]) => {
                messages.forEach(m => {
                  if(m.email === this.currentUser.email && m.groupName === this.groupName) {
                    const messageKey = m.groupName + '+' + convertedEmail + '+' + m.timeSend;
                    // console.log("message key: " + messageKey);
                    const second_promise = this.chatService.removeMessage(messageKey);
                    // second_promise
                    //   .then(() => {
                    //     this.router.navigateByUrl('');
                    //     this.toastr.success("Rời khỏi phòng thành công.", "Thông Báo");
                    //   }).catch(() => {
                    //     console.log("remove user's messages fail");
                    //   });
                  }
                });
                this.router.navigateByUrl('');
                this.toastr.success("Rời khỏi phòng thành công.", "Thông Báo");
              })
            }).catch(() => {
              console.log("remove group user fail");
            });
        }
      }
    });
  }

}
