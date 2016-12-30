import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ForumService } from '../../../services/forum.service';
import { NotificationsService } from './../../../../../node_modules/angular2-notifications';

@Component({
  selector: 'app-single-post-comment',
  templateUrl: './single-post-comment.component.html',
  styleUrls: ['./single-post-comment.component.css']
})
export class SinglePostCommentComponent implements OnInit {

 @Input() comment: any;
 likes: number;
 alreadyLiked: boolean;
  constructor(private _forumService: ForumService, private _notificationService: NotificationsService) { }

  ngOnInit() {
    this.likes = this.comment.likes;
    this.alreadyLiked = this.comment.alreadyLiked;
  }

  onLike() {
      console.log('like');
      const commentId = this.comment._id,
        postId = this.comment.postId;

      
      this._forumService
        .likeComment({commentId, postId })
        .subscribe(response => {
                if (response.message.type === 'error') {
                    this._notificationService.error('Error', `${response.message.text}`);
                } else {
                    this._notificationService.success('Success.', `Post liked`);
                    console.log(response);
                    this.likes += 1;
                    this.alreadyLiked = true;
                   // setTimeout(() => this._router.navigateByUrl('/forum'), 1500);
                }
            },
            err => console.log(err));
  }

  onUnlike() {
     console.log('like');
      const commentId = this.comment._id,
        postId = this.comment.postId;

      this._forumService
        .unLikeComment({commentId, postId })
        .subscribe(response => {
                if (response.message.type === 'error') {
                    this._notificationService.error('Error', `${response.message.text}`);
                } else {
                    this._notificationService.success('Success.', `Post liked`);
                    this.likes -= 1;
                    this.alreadyLiked = false;
                    
                    console.log(response);
                   // setTimeout(() => this._router.navigateByUrl('/forum'), 1500);
                }
            },
            err => console.log(err));
  }
}
