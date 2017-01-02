import { Component, OnInit } from '@angular/core';
import { UserService } from './../../common-services/user.service';


@Component({
  selector: 'app-profile-outbox',
  templateUrl: './profile-outbox.component.html',
  styleUrls: ['./profile-outbox.component.css']
})
export class ProfileOutboxComponent implements OnInit {

  private _userService: UserService;
  public userDetails: any;

  constructor(userService: UserService) {
    this._userService = userService;
    this.userDetails = '';
  }

  private getAllOutboxMessages() {
    let username = JSON.parse(localStorage.getItem('user')).result.username;

    this._userService.getUserData(username).subscribe(user => {
      this.userDetails = user;
    });
  }

  ngOnInit() {
    this.getAllOutboxMessages();
  }

}
