import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public postsInfo: any;
  public params: any;
  public sort: any;
  constructor(private _service: ForumService, private _route: ActivatedRoute ) { }

 ngOnInit() {
   this.params = (<any>this._route.queryParams)._value.value;
   this.sort = (<any>this._route.queryParams)._value.sort;
    this._service
      .getFilteredPost(this.params)
      .subscribe(response => {
                if (response.message === 'error') {
                    
                } else {
                  //  this.posts = response;
                  console.log('---------');
                      console.log(response);
                    let forumPostsMapped = response;

                    forumPostsMapped = forumPostsMapped.map(x => {
                      x.answerCount = x.answers.length;
                      return x;
                    })

                    this.postsInfo = forumPostsMapped;
                    console.log('asddasdsa');
                    console.log(this.postsInfo);
                }
            },
            err => console.log(err));
  }

}
