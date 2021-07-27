import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  userEmail: string;
  userName: string;
  userMessage: string;
  timeSent: string;
  isOwnMessage: boolean;

  constructor( private authService: AuthService ) {
    this.authService.authUser().subscribe(user => {
      this.isOwnMessage = (user.email === this.userEmail);
    });
  }

  ngOnInit(): void {
    this.userEmail = this.chatMessage.email;
    this.userName = this.chatMessage.userName;
    this.userMessage = this.chatMessage.message;
    this.timeSent = this.chatMessage.timeSend;
  }

}
