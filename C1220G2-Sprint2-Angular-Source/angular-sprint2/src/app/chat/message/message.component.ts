import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { FirebaseAuthService } from '../services/firebaseAuth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  userEmail: string;
  // userName: string;
  userAvatar: string;
  userMessage: string;
  timeSent: string;
  isOwnMessage: boolean;

  constructor( private authService: FirebaseAuthService ) {
    this.authService.authUser().subscribe(user => {
      // this.isOwnMessage = (user.email === this.userEmail);
      this.isOwnMessage = (user.email === this.chatMessage.email);
    });
  }

  ngOnInit(): void {
    this.userEmail = this.chatMessage.email;
    // this.userName = this.chatMessage.userName;
    this.userAvatar = this.chatMessage.userAvatar;
    // console.log("user avatar in message: " + this.userAvatar);
    this.userMessage = this.chatMessage.message;
    this.timeSent = this.chatMessage.timeSend;
  }

}
