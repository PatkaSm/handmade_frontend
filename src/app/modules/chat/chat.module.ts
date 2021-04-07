import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ThreadListComponent, ChatComponent],
  imports: [CommonModule, ChatRoutingModule, SharedModule],
})
export class ChatModule {}
