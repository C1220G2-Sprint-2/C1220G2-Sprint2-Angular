import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatroomComponent } from './chat-room/chat-room.component';


const routes: Routes = [
  {path: ':groupName', component: ChatroomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
