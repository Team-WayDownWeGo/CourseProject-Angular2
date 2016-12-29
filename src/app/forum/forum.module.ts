import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule, NotificationsService } from './../../../node_modules/angular2-notifications';
import { RouterModule } from '@angular/router';

import { CreatePostComponent } from './create-post/create-post.component';
import { ForumService } from '../services/forum.service';
import { SinglePostComponent } from './single-post/single-post.component';
import { SinglePostCommentComponent } from './single-post/single-post-comment/single-post-comment.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
     FormsModule,
      ReactiveFormsModule
  ],
  declarations: [ CreatePostComponent, SinglePostComponent, SinglePostCommentComponent ],
  providers: [ForumService, NotificationsService]
})
export class ForumModule { }




