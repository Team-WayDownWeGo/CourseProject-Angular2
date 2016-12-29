import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from './../../../common-services/user.service';
import { User } from './../../model/user-model';
import { Message } from './../../model/message-model';
import { NotificationsService } from './../../../../../node_modules/angular2-notifications';



@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  private _route;
  private _params;
  private _notificationService: NotificationsService;
  private _username;
  public _userService;
  public username: string;
  public firstname: string;
  public lastname: string;
  // for test purposes to replace with real bool when created
  public isUserLoggedIn: boolean;
  public message: Message;


  constructor(route: ActivatedRoute, userService: UserService, notificationService: NotificationsService) {
    this._route = route;
    this._params = route.params;
    this._userService = userService;
    this.message = new Message();
    this._notificationService = notificationService;
    this._username = this._params._value.username;
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

  private sendMessage() {
    console.log('vikna me formata');
    console.log(this.message);
    this._userService.sendMessageToUser(this._params._value.username, 'pesho', this.message)
      .subscribe(response => {
        console.log(response);
        if (response.message.type === 'error') {
          this._notificationService.error('Error', `${response.message.text}`);
        } else {
          this._notificationService.success('Success.', 'Message to `${this._username}` sent.');
          console.log(response.id);
        }
      },
      err => console.log(err));
  }
  ngOnInit() {
    this.getUser();
    this.isUserLoggedIn = true;
  }
}
