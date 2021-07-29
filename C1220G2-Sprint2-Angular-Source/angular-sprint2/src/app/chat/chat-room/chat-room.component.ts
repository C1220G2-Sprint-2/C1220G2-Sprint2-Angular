import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseUser } from 'src/app/models/firebase-user.model';
import { GroupUser } from 'src/app/models/group-user.model';
import { User } from 'src/app/models/user.model';
import { ChatService } from '../services/chat.service';
import { FirebaseAuthService } from '../services/firebaseAuth.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('scroller') private feedContainer: ElementRef;
  userEmail: FormControl;
  groupName: string;
  usersNotInGroup: string[] = [];
  groupsUsers: GroupUser[];
  usersInGroup: string[] = [];
  doUpdateUsersInGroup: boolean;

  currentUser: User;


  constructor( private route: ActivatedRoute,
     private toastr: ToastrService,
     private chatService: ChatService,
     private firebaseAuthService: FirebaseAuthService) { }

  ngOnDestroy(): void {
    const userEmail = this.currentUser.email;
    // use createGroupUser() to update a group-user
    this.chatService.createGroupUser(this.groupName, userEmail);
  }

  ngOnInit(): void {

    this.firebaseAuthService.authUser().subscribe(user => {
      if (user !== null && user !== undefined) {
        this.currentUser = user;
      }
    });

    this.doUpdateUsersInGroup = false;
    this.userEmail = new FormControl('', [Validators.required]);

    this.route.paramMap.subscribe(params => {
      this.groupName = params.get('groupName');
    });

    this.getUsersNotInGroup();

  }

  getUsersNotInGroup() {

    // this.usersNotInGroup = [];
    // this.userEmail = new FormControl(this.userEmail.value, [Validators.required]);

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
          if (!this.usersInGroup.includes(user.email)
            && user.email.toLowerCase().includes(this.userEmail.value)) {
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
    this.userEmail = new FormControl('', [Validators.required]);
    const promise = this.chatService.createGroupUser(this.groupName, email);
    promise
      .then(() => {
        this.doUpdateUsersInGroup = !this.doUpdateUsersInGroup;
        this.toastr.success("Thêm mới " + email + " thành công.", "Thông Báo");
      }).catch(() => {
        this.toastr.error("Thêm mới " + email + " thất bại.", "Thông Báo")
      });
  }

  getNewMember(newMember: string) {
    this.userEmail = new FormControl(newMember, [Validators.required]);
  }
}
