import { Component, OnInit } from '@angular/core';
import { UserService } from './../../common-services/user.service';
import { ForumService } from './../../services/forum.service';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements OnInit {

  private _userService: UserService;
  public userDetails: any;
  private _forumService: ForumService;
  public username: any = JSON.parse(localStorage.getItem('user')).result.username;
  public likes: number = 0;
  public posts: number = 0;

  constructor(userService: UserService, forumService: ForumService) {
    this._userService = userService;
    this._forumService = forumService;
    this.userDetails = '';
  }
  private getUserDetails() {
    this._userService.getUserData(this.username).subscribe(user => {
      this.userDetails = user;
    });
  }
  private getNumberOfLikes() {
    this._forumService.getAllUserPosts(this.username).subscribe(allPosts => {
      allPosts.forEach(p => {
        this.posts++;
        this.likes += p.likes;
      });
    });
  }
  ngOnInit() {
    this.getUserDetails();
    this.getNumberOfLikes();
  }
}
