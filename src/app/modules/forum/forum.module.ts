import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum/forum.component';
import { PostComponent } from './post/post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AddEditPostComponent } from './add-edit-post/add-edit-post.component';
import { ForumRoutingModule } from './forum-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostCategoriesComponent } from './post-categories/post-categories.component';

@NgModule({
  declarations: [
    ForumComponent,
    PostComponent,
    PostDetailsComponent,
    AddEditPostComponent,
    PostCategoriesComponent,
  ],
  imports: [CommonModule, ForumRoutingModule, SharedModule],
})
export class ForumModule {}
