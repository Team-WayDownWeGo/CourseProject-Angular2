import { Component, OnInit } from '@angular/core';
import { ForumService } from './../../services/forum.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-all-posts-by-user',
  templateUrl: './all-posts-by-user.component.html',
  styleUrls: ['./all-posts-by-user.component.css']
})
export class AllPostsByUserComponent implements OnInit {

  private _forumService: ForumService;
  private _route: ActivatedRoute;
  private _params: any;
  private _username: string;
  public userPosts: any = new Array();

  constructor(forumService: ForumService, route: ActivatedRoute) { 
    this._forumService = forumService;
    this._route = route;
    this._params = route.params;
    this._username = this._params._value.username;
  }

  private getAllUsersPosts() {
    this._forumService.getAllUserPosts(this._username).subscribe(response => {
      this.userPosts = response;
      console.log(this.userPosts);
    });
  }

  ngOnInit() {
    this.getAllUsersPosts();
  }

}
