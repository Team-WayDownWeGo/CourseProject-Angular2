import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

public posts: any;
public sortBy: string;
  constructor(private _service: ForumService) {
    this.sortBy = 'date';
   }

  ngOnInit() {
     this._service
      .getPostsForHomePage()
      .subscribe(response => {
                if (response.message === 'error') {
                    // this._notificationService.error('Error', `${response.message.text}`);
                } else {
                  this.posts = response;
                }
            },
            err => console.log(err));
  }
}

