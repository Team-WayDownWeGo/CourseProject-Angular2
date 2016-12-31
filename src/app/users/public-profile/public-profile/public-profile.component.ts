import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './../../../common-services/user.service';
import { User } from './../../model/user-model';
import { Message } from './../../model/message-model';
import { NotificationsService } from './../../../../../node_modules/angular2-notifications';
import { AuthService } from './../../../auth/auth.service';
import { ForumService } from './../../../services/forum.service';
import { SinglePostComponent } from './../../../forum/single-post/single-post.component';


@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  private _route: ActivatedRoute;
  private _params: any;
  private _notificationService: NotificationsService;
  private _username: string;
  private _router: Router;
  public _userService: UserService;
  public _forumService: ForumService;
  private _authService: any;
  public username: string;
  public firstname: string;
  public lastname: string;
  public isUserLoggedIn: boolean;
  public message: Message;
  public displayHeader: Boolean;
  public userPosts: any = new Array();
  public userPostsCount: Number = 0;

  public options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor(route: ActivatedRoute,
    userService: UserService,
    notificationService: NotificationsService,
    router: Router,
    authService: AuthService,
    forumService: ForumService) {
    this._route = route;
    this._params = route.params;
    this._userService = userService;
    this.message = new Message();
    this._notificationService = notificationService;
    this._username = this._params._value.username;
    this.displayHeader = true;
    this._router = router;
    this._authService = authService;
    this._forumService = forumService;
  }

  private getUser() {
    let username = this._params._value.username;

    this._userService.getUserData(username)
      .subscribe(
      user => {
        if (user) {
          this.username = user.username;
          this.firstname = user.firstName;
          this.lastname = user.lastName;
        } else {
          this._notificationService.error('Error', 'User not found',
            {
              timeOut: 5000,
              showProgressBar: true,
              pauseOnHover: false,
              clickToClose: false
            });
          setTimeout(() => this._router.navigateByUrl('/'), 2000);
        }

      },
      error => console.log('not found'));
  }

  private sendMessage() {
    this._userService.sendMessageToUser(this._params._value.username, 'pesho', this.message)
      .subscribe(response => {
        this._notificationService.success('Success', 'Message sent',
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: false
          });
        this.displayHeader = !this.displayHeader;
      },
      err => console.log(err));
  }

  private getAllUsersPosts() {
    let username = this._params._value.username;

    this._forumService.getAllUserPosts(this._username).subscribe(response => {
      this.userPosts = response;
      this.userPostsCount = this.userPosts.length;
      console.log(this.userPosts);
    });
  }

  ngOnInit() {
    this.getUser();
    this.isUserLoggedIn = this._authService.isLoggedIn();
    this.getAllUsersPosts();
  }
}
