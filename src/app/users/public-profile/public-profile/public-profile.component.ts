import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from './../../../common-services/user.service';
import { User } from './../../model/user-model';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  private _route;
  private _params;
  private _userService;
  public username: string;
  public firstname: string;
  public lastname: string;


  constructor(route: ActivatedRoute, userService: UserService) {
    this._route = route;
    this._params = route.params;
    this._userService = userService;
  }

  private getUser() {
    let username = this._params._value.username;

    this._userService.getUserData(username)
      .subscribe(
      user => {
        // TODO: find a way to work directly with observable ?????
        this.username = user.username;
        this.firstname = user.firstName;
        this.lastname = user.lastName;
      },
      // TODO: redirect to users not found html page
      error => console.log('not found'));
  }
  ngOnInit() {
    this.getUser();

  }
}
