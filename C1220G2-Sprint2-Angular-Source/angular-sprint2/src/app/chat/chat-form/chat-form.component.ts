import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;
  @Input() groupName: string;

  constructor(private chat: ChatService) { }

  ngOnInit(): void {
  }

  send(): void {
    this.chat.sendMessage(this.message, this.groupName);
    this.message = '';
  }

  handleSubmit(event): void {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
