import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/chat/services/auth.service';
import { ChatService } from 'src/app/chat/services/chat.service';
import { GroupUser } from 'src/app/models/group-user.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  chatGroupName: FormControl;

  // groupsOfUser: GroupUser[] = []
  groupsOfUser: GroupUser[] = [];
  currentUser: User;

  constructor( private router: Router, 
    private chatService: ChatService,
    private authService: AuthService) {

    }

  ngOnInit(): void {
    this.chatGroupName = new FormControl('');

    this.authService.authUser().subscribe(user => {
      this.currentUser = user;
      this.groupsOfUser = [];
      this.getGroupsOfUser();
    });
  }

  getGroupsOfUser() {
    this.chatService.getBelongGroups().subscribe(groupList => {
      groupList.forEach(e => {
        if (e.userEmail === this.currentUser.email) {
          this.groupsOfUser.push(e);
        }
      });
    })
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

  goToGroupChat(groupName: string) {
    // replace literal white space in path by its code.
    groupName.replace(' ', "%20%");
    // this.router.navigate(['/trao-doi', {groupName: groupName}]);
    this.router.navigateByUrl('/trao-doi/' + groupName);
  }

}
