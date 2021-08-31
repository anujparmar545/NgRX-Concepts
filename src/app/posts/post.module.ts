import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router'
import { StoreModule } from '@ngrx/store';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostslistComponent } from './postslist/postslist.component';
import { postReducer } from './postslist/state/posts.reducer';
import { POST_STATE_NAME } from './postslist/state/posts.selector';

const routes: Routes = [
  {
    path: '',
    component: PostslistComponent,
    children: [
      {
        path: 'add',
        component: AddPostComponent
      },
      {
        path:'edit/:id',
        component: EditPostComponent
      }
    ]
  },
];

@NgModule({
  declarations:[
    PostslistComponent,
    AddPostComponent,
    EditPostComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(POST_STATE_NAME, postReducer),
    RouterModule.forChild(routes)]
})
export class PostModule {}
