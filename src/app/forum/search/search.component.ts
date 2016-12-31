import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public posts: any[];
  public params: any;
  constructor(private _service: ForumService, private _route: ActivatedRoute ) { }

 ngOnInit() {
   this.params = (<any>this._route.queryParams)._value;

    this._service
      .getFilteredPost(this.params)
      .subscribe(response => {
                if (response.message === 'error') {
                    
                } else {
                    this.posts = response;
                }
            },
            err => console.log(err));
  }

}
