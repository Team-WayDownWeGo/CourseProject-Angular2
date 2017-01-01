import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from './../../../../node_modules/angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';

import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],

})
export class SinglePostComponent implements OnInit {

  username: string;
  title: string;
  description: string;
  commentForm: FormGroup;
  commentMessage: string;
  options: Object;
  public post: any;
  sub: any;
  id: string;
  likes: number;
  alreadyLiked: boolean;
  constructor(private _service: ForumService,
    private fb: FormBuilder,
    private _notificationService: NotificationsService,
    private _router: Router,
    private _route: ActivatedRoute) {
      this.username = JSON.parse(localStorage.getItem('user')).result.username;
      this.post = {};
      this.options = { timeOut: 1500, pauseOnHover: true, showProgressBar: true, animate: 'scale', position: ['right', 'bottom'] };
   }

  ngOnInit() {
    console.log('in oninit');
      this.sub = this._route.params.subscribe(params => {
       this.id = params['id'];
    });

    this.commentForm = this.fb.group({
      commentMessage: ['', [Validators.required, Validators.maxLength(200)]],
      user: [this.username] 
    });

   this._service
            .getPost(this.id)
            .subscribe(response => {
                if (response.message === 'error') {
                    this._notificationService.error('Error', `${response.message.text}`);
                } else {
                  
                  
                  this.post = response;
                 this.likes = response.likes;
                  this.post.username = response.user.username;
                  this.post.answerLength = response.answers.length;

                  if (response.usersLiked.indexOf(this.username) >= 0) {
                    this.post.alreadyLiked = true;
                    this.alreadyLiked = true;
                  }

                  this.post.answers.forEach((x) => {
                    if (x.usersLiked.indexOf(this.username) >= 0)
                    {
                      x.alreadyLiked = true;
                    }
                    else
                    {
                      x.alreadyLiked = false;
                    }

                    x.postId = this.id;
                  });
                }
            },
            err => console.log(err));
  }

  public onCreateComment(): void {
    console.log('onCreatePost');
      const content = this.commentForm.value,
        postId = this.id,
        user = this.username;
        
        this._service
            .addCommentToPost({content, postId })
            .subscribe(response => {
                if (response.message.type === 'error') {
                    this._notificationService.error('Error', `${response.message.text}`);
                } else {
                    this._notificationService.success('Success.', `Thread is created.`);
                    console.log(response.id);
                   // setTimeout(() => this._router.navigateByUrl('/forum'), 1500);
                }
            },
            err => console.log(err));
    }

    public onPostLike(): void {
      console.log('like');
      let currentUser = {
        user: this.username
      };
      this._service
        .likePost(this.id, currentUser)
        .subscribe(response => {
                if (response.message.type === 'error') {
                    this._notificationService.error('Error', `${response.message.text}`);
                } else {
                    this._notificationService.success('Success.', `Post liked`);
                   // setTimeout(() => this._router.navigateByUrl('/forum'), 1500);
                  this.likes += 1;
                  this.alreadyLiked = true;
                }
            },
            err => console.log(err));
    }

    public onPostUnlike(): void{
       let currentUser = {
        user: this.username
      };
      this._service
        .unlikePost(this.id, currentUser)
        .subscribe(response => {
                if (response.message.type === 'error') {
                    this._notificationService.error('Error', `${response.message.text}`);
                } else {
                    this._notificationService.success('Success.', `Post liked`);
                   // setTimeout(() => this._router.navigateByUrl('/forum'), 1500);
                  this.likes -= 1;
                  this.alreadyLiked = false;
                }
            },
            err => console.log(err));
    }
}
