import { Component, OnInit } from '@angular/core';
import { UserService } from './../../common-services/user.service';
import { NotificationsService } from './../../../../node_modules/angular2-notifications';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-inbox',
  templateUrl: './profile-inbox.component.html',
  styleUrls: ['./profile-inbox.component.css']
})
export class ProfileInboxComponent implements OnInit {

  private _userService: UserService;
  public userDetails: any;
  private _notificationService: NotificationsService;
  private _router: Router;

  public options = {
    position: ['bottom', 'right'],
    timeOut: 2000,
    lastOnBottom: true
  };

  constructor(userService: UserService, notificationService: NotificationsService, router: Router) {
    this._userService = userService;
    this.userDetails = '';
    this._notificationService = notificationService;
    this._router = router;
  }

  private getAllInBoxMessages() {
    let username = JSON.parse(localStorage.getItem('user')).result.username;

    this._userService.getUserData(username).subscribe(user => {
      this.userDetails = user;
    });
  }

  public updateMessageToViewed(messageId: any) {
    console.log('update msg');
    console.log(messageId);
    this._userService.updateMessageToViewed(messageId).subscribe(res => {


      this._notificationService.success('Success', 'Message sent',
        {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: false
        });

      setTimeout(() => this._router.navigateByUrl('/profile/inbox'), 1000);
    }, err => {
      this._notificationService.error('Error', 'Error');
      console.log(err);
    });
  }

  ngOnInit() {
    this.getAllInBoxMessages();
  }
}
