import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ThreadListComponent } from './thread-list/thread-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ThreadListComponent,
  },
  {
    path: 'messages/:id',
    component: ChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
