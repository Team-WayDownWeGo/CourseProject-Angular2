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

  constructor(private _service: ForumService,
    private fb: FormBuilder,
    private _notificationService: NotificationsService,
    private _router: Router,
    private _route: ActivatedRoute) {
      this.post = {};
      //  this.username = JSON.parse(localStorage.getItem('user')).result.username;
      this.options = { timeOut: 1500, pauseOnHover: true, showProgressBar: true, animate: 'scale', position: ['right', 'bottom'] };
   }

  ngOnInit() {
    console.log('in oninit');
      this.sub = this._route.params.subscribe(params => {
       this.id = params['id'];
    });

    this.commentForm = this.fb.group({
      commentMessage: ['', [Validators.required, Validators.maxLength(200)]],
    });

   this._service
            .getPost(this.id)
            .subscribe(response => {
                if (response.message === 'error') {
                    this._notificationService.error('Error', `${response.message.text}`);
                } else {
                  this.post = response;
                  this.post.username = response.user.username;
                  this.post.answerLength = response.answers.length;

                  if (response.usersLiked.indexOf('Gosho') >= 0) {
                    this.post.alreadyLiked = true;
                  }
                  console.log('not error heree');
                  console.log(this.post);
                   // this._notificationService.success('Success.', `Thread is created.`);
                    console.log(response.id);
                   // setTimeout(() => this._router.navigateByUrl('/forum'), 1500);
                }
            },
            err => console.log(err));
  }

  public onCreateComment(): void {
    console.log('onCreatePost');
      const content = this.commentForm.value,
        postId = this.id;
        
        this._service
            .addCommentToPost({content, postId})
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

    public onPostLike(): void{
      console.log('like');
      this._service
        .likePost(this.id)
        .subscribe(response => {
                if (response.message.type === 'error') {
                    this._notificationService.error('Error', `${response.message.text}`);
                } else {
                    this._notificationService.success('Success.', `Post liked`);
                   // setTimeout(() => this._router.navigateByUrl('/forum'), 1500);
                   console.log('--------------');
                   console.log(response);
                   console.log('--------------');
                }
            },
            err => console.log(err));
    }

    public onPostUnlike(): void{
      this._service
        .unlikePost(this.id)
        .subscribe(response => {
                if (response.message.type === 'error') {
                    this._notificationService.error('Error', `${response.message.text}`);
                } else {
                    this._notificationService.success('Success.', `Post liked`);
                   // setTimeout(() => this._router.navigateByUrl('/forum'), 1500);
                }
            },
            err => console.log(err));
    }
}
