import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseUser } from 'src/app/models/firebase-user.model';
import { GroupUser } from 'src/app/models/group-user.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;
  userEmail: FormControl;
  groupName: string;
  usersNotInGroup: string[] = [];
  groupsUsers: GroupUser[];
  usersInGroup: string[] = [];
  doUpdateUsersInGroup: boolean;


  constructor( private route: ActivatedRoute,
     private toastr: ToastrService,
     private chatService: ChatService) { }

  ngOnInit(): void {
    this.doUpdateUsersInGroup = false;
    this.userEmail = new FormControl('');

    this.route.paramMap.subscribe(params => {
      this.groupName = params.get('groupName');
    });

    this.getUsersNotInGroup();
    
  }

  getUsersNotInGroup() {
    this.chatService.getGroupsUsers().subscribe(groupUsers => {
      if (this.usersInGroup.length > 0) this.usersInGroup = [];
      // console.log("Users in group: ")
      groupUsers.forEach(e => {
        if (e.groupName === this.groupName) {
          this.usersInGroup.push(e.userEmail);
        }
      });
      // console.log("Users not in group: ");
      this.chatService.getUsers().subscribe((userList: FirebaseUser[]) => {
        if (this.usersNotInGroup.length > 0) this.usersNotInGroup = [];
        userList.forEach(user => {
          if (!this.usersInGroup.includes(user.email)) {
            this.usersNotInGroup.push(user.email);
          }
        })
      })
    });
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
    = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  addNewMember() {
    const email: string = this.userEmail.value;
    const promise = this.chatService.createGroupUser(this.groupName, email);
    promise
      .then(() => {
        this.doUpdateUsersInGroup = !this.doUpdateUsersInGroup;
        this.toastr.success("Thêm mới " + email + " thành công.", "Thông Báo");
      }).catch(() => {
        this.toastr.error("Thêm mới " + email + " thất bại.", "Thông Báo")
      });
  }
}
