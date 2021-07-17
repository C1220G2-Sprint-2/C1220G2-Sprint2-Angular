import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InteractiveRoutingModule } from './interactive-routing.module';
import { ConcernComponent } from './concern/concern.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { CommentComponent } from './comment/comment.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [ConcernComponent, AnnouncementComponent, CommentComponent, NotificationComponent],
  imports: [
    CommonModule,
    InteractiveRoutingModule
  ]
})
export class InteractiveModule { }
