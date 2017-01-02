import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from './../../../../node_modules/angular2-notifications';
import { UserService } from './../../common-services/user.service';
import { AuthService } from './../../auth/auth.service';

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 20;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 30;

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  public form: FormGroup;
  public fb: FormBuilder;
  public options: Object;

  private _authService: AuthService;
  private _router: Router;
  private _notificationsService: NotificationsService;
  private _userService: UserService;

  constructor(fb: FormBuilder, authService: AuthService, router: Router, notificationsService: NotificationsService,
    userService: UserService) {
    this.fb = fb;
    this._authService = authService;
    this._userService = userService;
    this._router = router;
    this._notificationsService = notificationsService;
    this.options = { timeOut: 1500, pauseOnHover: true, showProgressBar: true, animate: 'scale', position: ['right', 'bottom'] };
  }

  public updateProfile() {
    let username = JSON.parse(localStorage.getItem('user')).result.username;
    console.log(this.form.value);
    this._userService
      .updateUserData(username, this.form.value)
      .subscribe(res => {
        if (res.err) {
          this._notificationsService.error('', res.error);
        } else {
          this._notificationsService.success('', res.success)
          setTimeout(() => this._router.navigateByUrl('/profile/home'), 1500);
        }
      },
      err => console.log(err));
  }

  ngOnInit() {
    let namesValidators = [Validators.required, Validators.minLength(MIN_NAME_LENGTH), Validators.maxLength(MAX_NAME_LENGTH)];

    this.form = this.fb.group({
      firstName: ['', Validators.compose(namesValidators)],
      lastName: ['', Validators.compose(namesValidators)],
      password: ['', Validators.compose([Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(MAX_PASSWORD_LENGTH)])],
      confirmPassword: ['', Validators.required]
    });

  }

}
