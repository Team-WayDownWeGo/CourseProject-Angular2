import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { UserService } from './../../common-services/user.service'
import { NotificationsService } from './../../../../node_modules/angular2-notifications';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @HostBinding('class') public classes = 'signup-page';
  public form: FormGroup;
  public fb: FormBuilder;
  public options: Object;

  private _router: Router;
  private _authService: AuthService;
  private _notificationsService: NotificationsService;
  private _userService: UserService;

  constructor(
    fb: FormBuilder,
    authService: AuthService,
    notificationsService: NotificationsService,
    userService: UserService,
    router: Router) {
    this.fb = fb;
    this._authService = authService;
    this._notificationsService = notificationsService;
    this._userService = userService;
    this._router = router;
    this.options = { timeOut: 1500, pauseOnHover: true, showProgressBar: true, animate: 'scale', position: ['right', 'bottom'] };
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    this._authService.loginUser(this.form.value)
      .subscribe((response: any) => {
        let result: any = (typeof (response) === 'string') ? JSON.parse(response) : response;

        if (result.error) {
          this._notificationsService.error('', result.error);
        } else {
          localStorage.setItem('user', JSON.stringify(result));
          this._userService.setIsUserLoggedIn();
          this._userService.setIsAdmin(result.isAdmin);
          this._notificationsService.success('', result.success);
          setTimeout(() => this._router.navigateByUrl('/profile/home'), 1500);
        }
      });
  }

}
