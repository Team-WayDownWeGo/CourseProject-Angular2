import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { NotificationsService } from './../../../../node_modules/angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  public posts: any[];
  private page: number;
  constructor(private _service: ForumService,
     private _notificationService: NotificationsService,
     private _route: ActivatedRoute) { 
    this.posts = [];
  }

  ngOnInit() {
    this._service
      .getAllPosts(this.page)
      .subscribe(response => {
                if (response.message === 'error') {
                    this._notificationService.error('Error', `${response.message.text}`);
                } else {
                    console.log(response.id);
                    this.posts = response;
                }
            },
            err => console.log(err));
  }

}
