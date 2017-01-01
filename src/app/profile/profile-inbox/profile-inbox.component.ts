import { Component, OnInit } from '@angular/core';
import { UserService } from './../../common-services/user.service';

@Component({
  selector: 'app-profile-inbox',
  templateUrl: './profile-inbox.component.html',
  styleUrls: ['./profile-inbox.component.css']
})
export class ProfileInboxComponent implements OnInit {

  private _userService: UserService;
  public userDetails: any;

  constructor(userService: UserService) {
    this._userService = userService;
    this.userDetails = '';
  }

  private getAllInBoxMessages() {
    let userInfoFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    let username = userInfoFromLocalStorage.result.username;

    this._userService.getUserData(username).subscribe(user => {
        this.userDetails = user;
    });
  }
  ngOnInit() {
    this.getAllInBoxMessages();
    console.log(this.userDetails.inbox);
  }
}
