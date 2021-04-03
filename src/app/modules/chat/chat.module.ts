import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { CommentsComponent } from '../comment/comments/comments.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CommentsComponent, ThreadListComponent, ChatComponent],
  imports: [CommonModule, ChatRoutingModule, SharedModule],
})
export class ChatModule {}
