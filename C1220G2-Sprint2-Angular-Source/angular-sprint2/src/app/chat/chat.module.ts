import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatroomComponent } from './chat-room/chat-room.component';
import { MessageFeedComponent } from './message-feed/message-feed.component';
import { MessageComponent } from './message/message.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChatFormComponent,
                ChatroomComponent,
                MessageFeedComponent, 
                MessageComponent, 
                UserListComponent, 
                UserItemComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChatModule { }
