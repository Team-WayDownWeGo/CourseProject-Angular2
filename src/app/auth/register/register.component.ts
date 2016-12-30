import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from './../../../../node_modules/angular2-notifications';

import { AuthService } from './../../auth/auth.service';

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 20;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 30;

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  @HostBinding('class') classes = 'signup-page';
  public form: FormGroup;
  public fb: FormBuilder;
  public options: Object;

  private _authService: AuthService;
  private _router: Router;
  private _notificationsService: NotificationsService;

  constructor(fb: FormBuilder, authService: AuthService, router: Router, notificationsService: NotificationsService) {
    this.fb = fb;
    this._authService = authService;
    this._router = router;
    this._notificationsService = notificationsService;
    this.options = { timeOut: 1500, pauseOnHover: true, showProgressBar: true, animate: 'scale', position: ['right', 'bottom'] };
  }

  ngOnInit() {
    let namesValidators = [Validators.required, Validators.minLength(MIN_NAME_LENGTH), Validators.maxLength(MAX_NAME_LENGTH)];

    this.form = this.fb.group({
      username: ['', Validators.compose(namesValidators)],
      firstName: ['', Validators.compose(namesValidators)],
      lastName: ['', Validators.compose(namesValidators)],
      password: ['', Validators.compose([Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH), Validators.maxLength(MAX_PASSWORD_LENGTH)])],
      confirmPassword: ['', Validators.required]
    })
  }

  public register(): void {
    this._authService
      .registerUser(this.form.value)
      .subscribe(response => {
        if(response.error) {
          this._notificationsService.error('', response.error);
        } else {
          this._notificationsService.success('', response.success)
          setTimeout(() => this._router.navigateByUrl('/login'), 1500);
        }
      },
      err => console.log(err));
  }

}
