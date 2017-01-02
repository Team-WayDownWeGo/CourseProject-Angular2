import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule, NotificationsService } from './../../../node_modules/angular2-notifications';
import { RouterModule } from '@angular/router';

import { CreatePostComponent } from './create-post/create-post.component';
import { ForumService } from '../services/forum.service';
import { SinglePostComponent } from './single-post/single-post.component';
import { PostRowComponent } from './list-posts/post-row/post-row.component';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { PaginationComponent } from './list-posts/pagination/pagination.component';
import { PresentationPipe } from '../pipes/presentation.pipe';
import { SinglePostCommentComponent } from './single-post/single-post-comment/single-post-comment.component';
import { ToNumberArrayPaginationPipe } from '../pipes/transform-to-array.pipe';
import { FilterPipe } from '../pipes/filter.pipe';
import { SearchComponent } from './search/search.component';
import { SortPipe } from '../pipes/sort.pipe';
import { HomeComponent } from './home/home.component';
import { MovingPostComponent } from './home/moving-post/moving-post.component';
import { SplicePipe } from '../pipes/splice.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
     FormsModule,
      ReactiveFormsModule
  ],
  declarations: [SplicePipe, MovingPostComponent, HomeComponent, SortPipe, SearchComponent, FilterPipe, PaginationComponent, CreatePostComponent, SinglePostComponent, SinglePostCommentComponent, PostRowComponent, ListPostsComponent, ToNumberArrayPaginationPipe, PresentationPipe ],
  providers: [ForumService, NotificationsService],
  exports: [PostRowComponent]
})
export class ForumModule { }




