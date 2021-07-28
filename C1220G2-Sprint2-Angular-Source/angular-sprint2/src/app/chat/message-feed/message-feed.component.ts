import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-message-feed',
  templateUrl: './message-feed.component.html',
  styleUrls: ['./message-feed.component.css']
})
export class MessageFeedComponent implements OnInit {

  feed: ChatMessage[] = [];
  // feed: Observable<ChatMessage[]>;
  @Input() groupName: string;

  constructor(private chatService: ChatService) { }

  // ngOnChanges(): void {
  //   // this.getAllMessagesInGroup();
  // }

  ngOnInit(): void {
    // this.feed = [];
    this.getAllMessagesInGroup();
  }

  getAllMessagesInGroup() {
    this.chatService.getMessages().subscribe(messages => {
      if (this.feed.length > 0) this.feed = [];
      messages.forEach(msg => {
        if (msg.groupName === this.groupName) {
          this.feed.push(msg);
        }
      });
    });
  }

}
