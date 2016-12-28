import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from './../../../common-services/user.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  private _route;
  private _params;

  constructor(route: ActivatedRoute) {
    this._route = route;
    this._params = route.params;
  }

  ngOnInit() {
    console.log(this._params._value.username);
  }

}
