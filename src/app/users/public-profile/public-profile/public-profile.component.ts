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
  private _userService;

  constructor(route: ActivatedRoute, userService: UserService) {
    this._route = route;
    this._params = route.params;
    this._userService = userService;
  }

  ngOnInit() {
    let username = this._params._value.username;
    this._userService.getUserData(username);
  }

}
