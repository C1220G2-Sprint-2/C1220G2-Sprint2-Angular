import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/chat/services/firebaseAuth.service';
import { ChatService } from 'src/app/chat/services/chat.service';

import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../security/token-storage.service';
import { User } from 'src/app/models/user.model';
import { GroupChat } from 'src/app/models/group-chat.model';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { GroupChatDTO } from 'src/app/models/group-chat-dto.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /* --------------------- Kha code ---------------------------- */
  chatGroupName: FormControl;
  // groupsOfUser: GroupUser[] = [];
  groupNames: string[] = [];
  currentUser: User;
  // groups: GroupChat[] = [];
  groups: GroupChatDTO[] = [];
  allGroupChats: GroupChat[] = [];
  hasNewMessages: boolean[] = [];
  // -----------------------------------------------
  /* --------------------- Cong code ---------------------------- */
  isLoggedIn: boolean = false;
  username: string;
  userId: number;
  userImage: string;
  name: string;
  // -----------------------------------------------
  constructor( private router: Router,
               private chatService: ChatService,
               private authService: FirebaseAuthService,
               private tokenStorageService: TokenStorageService,
               private toastService: ToastrService) {
  }
  ngOnInit(): void {

    /* --------------------- Kha code ---------------------------- */
    this.authService.authUser().subscribe(user => {
      if (user !== null && user !== undefined) {
        this.currentUser = user;
        this.getBelongGroups();
      }
    });

    this.getAllGroupChats();

    this.chatGroupName = new FormControl('', [Validators.required ,this.duplicatedGroupNameValidator(this.allGroupChats)]);
    /* ---------------------------- ---------------------------- */
    /* --------------------- Cong code ---------------------------- */

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.userId = user.id;
      this.userImage = user.avatar;
      this.name = user.name;
    }
    /* ---------------------------- ---------------------------- */
  }
  /* --------------------- Kha code ---------------------------- */
  duplicatedGroupNameValidator(groups: GroupChat[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isDuplicated: boolean = false;
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].groupName === control.value) {
          isDuplicated = true;
          break;
        }
      }
      return isDuplicated ? {duplicatedGroupName: {value: control.value}} : null;
    }

  }

  getGroupNames() {
    // Get name of groups that the current user belongs to.
    this.chatService.getGroupsUsers().subscribe(groupUserList => {
      if (this.groupNames.length > 0) this.groupNames = [];
      groupUserList.forEach(e => {
        if (e.userEmail === this.currentUser.email) {
          this.groupNames.push(e.groupName);
        }
      });
    })
  }

  getGroupChats() {
    // Get groups that the current user belongs to.
    this.chatService.getGroups().subscribe(groupChats => {
      // console.log("Group chats: " + groupChats);
      if (this.groups.length > 0) this.groups = [];
      groupChats.forEach(e => {
        if (this.groupNames.includes(e.groupName)) {
          // console.log("-----------------------------")
          // console.log("room name: " + e.groupName);
          this.chatService.getMessages().subscribe((messageList: ChatMessage[]) => {
            let lastMsgInGroup: ChatMessage;
            if (messageList) {
              const numberOfMessages = messageList.length;
              for (let i = numberOfMessages - 1; i >= 0; i--) {
                if (messageList[i].groupName === e.groupName) {
                  lastMsgInGroup = messageList[i];
                  break;
                }
              }
              
              let lastTimeSend = new Date();
              lastTimeSend.setDate(lastTimeSend.getDate() - 1);
              if (lastMsgInGroup) {
                lastTimeSend = new Date(lastMsgInGroup.timeSend);
              }
              // console.log("last time send: " + lastTimeSend);
              
              this.chatService.getGroupUser(e.groupName, this.currentUser.email).subscribe(groupUser => {
                const lastTimeLeave = new Date(groupUser.lastTimeLeave);
                // console.log("last time leave: " + lastTimeLeave);
                const hasNewMessage = (lastTimeLeave < lastTimeSend);
                // console.log("has new msg: " + hasNewMessage);
                // console.log("-----------------------------")
                const groupChatDto: GroupChatDTO = {
                  owner: e.owner,
                  groupName: e.groupName,
                  hasNewMsg: hasNewMessage
                };
                this.groups.push(groupChatDto);
              })
            }
          })
          // this.groups.push(e);
        }
      });
    })
  }
  getBelongGroups() {
    this.getGroupNames();
    this.getGroupChats();
  }
  createNewChatGroup() {
    const roomName = this.chatGroupName.value;
    // create group on firebase.
    this.chatService.createGroup(roomName)
      .then(() => {
        this.authService.authUser().subscribe(user => {
          this.chatService.createGroupUser(roomName, user.email)
            .then(() => {
              // this.router.navigateByUrl("/trao-doi");
              this.toastService.success("Tạo phòng họp thành công!", "Thành Công");
            })
        });
      }).catch(() => {
        this.toastService.error("Tạo phòng họp thất bại. Xin vui lòng thử lại!", "Thất Bại");
      });
    
  }
  // group name cannot be duplicated.
  goToGroupChat(groupName: string) {
    // replace literal white space in path by its code.
    groupName.replace(" ", "%20%");
    this.router.navigateByUrl('/trao-doi/' + groupName);
  }

  getAllGroupChats() {
    this.chatService.getGroups().subscribe((groups: GroupChat[]) => {
      this.allGroupChats = groups;
      // console.log("All group chats: " + this.allGroupChats);
      this.chatGroupName = new FormControl('', [Validators.required, this.duplicatedGroupNameValidator(this.allGroupChats)]);

    })
  }

  /* ---------------------------- ---------------------------- */
  /* ---------------------------- Cong code ---------------------------- */
  signOut() {
    this.authService.signOut(); // kha code
    this.tokenStorageService.signOut();
    window.location.assign("");
  }
  /* ---------------------------- ---------------------------- */
}
