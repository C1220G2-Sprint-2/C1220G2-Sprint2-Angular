import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/chat/services/auth.service';
import { ChatService } from 'src/app/chat/services/chat.service';
import { GroupChat } from 'src/app/models/group-chat.model';
import { User } from 'src/app/models/user.model';

import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../security/token-storage.service';

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
  groups: GroupChat[] = [];
  // -----------------------------------------------

  /* --------------------- Cong code ---------------------------- */
  isLoggedIn: boolean = false;
  username: string;
  userId: number;
  userImage: string;
  // -----------------------------------------------


  constructor( private router: Router, 
    private chatService: ChatService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private toastService: ToastrService) {
  }

  ngOnInit(): void {

    /* --------------------- Kha code ---------------------------- */
    this.authService.authUser().subscribe(user => {
      this.currentUser = user;
      // this.groupsOfUser = [];
      this.getBelongGroups();
    });
    this.chatGroupName = new FormControl('', [this.duplicatedGroupNameValidator(this.groups)]);
    /* ---------------------------- ---------------------------- */

    /* --------------------- Cong code ---------------------------- */

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;
      this.userId = user.id;
      this.userImage = user.avatar;
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
    this.chatService.getGroups().subscribe(groupChats => {
      if (this.groups.length > 0) this.groups = [];
      groupChats.forEach(e => {
        if (this.groupNames.includes(e.groupName)) {
          this.groups.push(e);
        }
      })
    })
  }

  getBelongGroups() {
    this.getGroupNames();
    this.getGroupChats();
  }

  createNewChatGroup() {
    const roomName = this.chatGroupName.value;
    // create group on firebase.
    this.chatService.createGroup(roomName);
    this.authService.authUser().subscribe(user => {
      this.chatService.createGroupUser(roomName, user.email);
    });
    // this.router.navigateByUrl("/trao-doi");
  }

  // group name cannot be duplicated.
  

  goToGroupChat(groupName: string) {
    // replace literal white space in path by its code.
    groupName.replace(" ", "%20%");
    this.router.navigateByUrl('/trao-doi/' + groupName);
  }

  /* ---------------------------- ---------------------------- */


  /* ---------------------------- Cong code ---------------------------- */
  signOut() {
    this.tokenStorageService.signOut();
    window.location.assign("");
  }
  /* ---------------------------- ---------------------------- */

}
