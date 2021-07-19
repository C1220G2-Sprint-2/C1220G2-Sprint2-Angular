import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-message-feed',
  templateUrl: './message-feed.component.html',
  styleUrls: ['./message-feed.component.css']
})
export class MessageFeedComponent implements OnInit, OnChanges {

  feed: ChatMessage[] = [];
  // feed: Observable<ChatMessage[]>;
  @Input() groupName: string;

  constructor(private chatService: ChatService) { }

  ngOnChanges(): void {
    this.feed = [];
    this.getAllMessagesInGroup();
  }

  ngOnInit(): void {
    // if (this.feed.length === 0) {
    //   this.getAllMessagesInGroup();
    // }
  }

  getAllMessagesInGroup() {
    this.chatService.getMessages().subscribe(messages => {
      messages.forEach(msg => {
        if (msg.groupName === this.groupName) {
          this.feed.push(msg); 
        }
      })
    });
  }

}
