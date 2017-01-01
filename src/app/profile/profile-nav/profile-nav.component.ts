import { Component, OnInit } from '@angular/core';
import { UserService } from './../../common-services/user.service';


@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.css']
})
export class ProfileNavComponent implements OnInit {

  private _userService: UserService;
  public unreadMessages: number = 0;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  private getAllUnreadInboxMessagesCount(): void {
    let username = JSON.parse(localStorage.getItem('user')).result.username;

    this._userService.getUserData(username).subscribe(user => {
      this.unreadMessages = user.inbox.filter(x => !x.isViewed).length;
      console.log(this.unreadMessages);
    });
  }
  ngOnInit() {
    this.getAllUnreadInboxMessagesCount();
  }

}
