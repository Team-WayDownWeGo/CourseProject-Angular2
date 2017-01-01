import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './common-services/user.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public isUserLoggedIn: boolean;

  private _userService: UserService;
  private _router: Router;
  private _authService: AuthService;

  public searchParam: string;

  constructor(userService: UserService, router: Router, authService: AuthService) {
    this._userService = userService;
    this._router = router;
    this._authService = authService;
    this.isUserLoggedIn = !!localStorage.getItem('user');
    this.searchParam = '';
  }

  public ngOnInit() {
    this._userService.getUserLoggedIn()
      .subscribe((isLooged: boolean) => this.isUserLoggedIn = isLooged);
  }

  public logout() {
    this._authService.logoutUser();
    this._router.navigateByUrl('/');
    this._userService.setIsUserLoggedIn();
  }

   public onSearch(): void {
            this._router.navigateByUrl(`/search?value=${this.searchParam}&sort=`);
    }
}
