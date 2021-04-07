import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditPostComponent } from './add-edit-post/add-edit-post.component';
import { ForumComponent } from './forum/forum.component';
import { PostCategoriesComponent } from './post-categories/post-categories.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
  {
    path: '',
    component: PostCategoriesComponent,
  },
  {
    path: 'category/:categoryName',
    component: ForumComponent,
  },
  {
    path: 'post/:id',
    component: PostDetailsComponent,
  },
  {
    path: 'add',
    component: AddEditPostComponent,
  },
  {
    path: 'post/:id/edit',
    component: AddEditPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumRoutingModule {}
