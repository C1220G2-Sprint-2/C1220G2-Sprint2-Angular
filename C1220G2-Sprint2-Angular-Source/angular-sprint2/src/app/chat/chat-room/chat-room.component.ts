import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor( private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.userEmail = new FormControl('');

    this.route.paramMap.subscribe(params => {
      this.groupName = params.get('groupName');
    })
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
    = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  addNewMember() {
  }
}
