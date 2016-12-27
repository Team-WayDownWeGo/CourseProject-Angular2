import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { NotificationsService } from './../../../../node_modules/angular2-notifications';
import { UserService } from './../../common-services/user.service' 

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
   userService: UserService) { 
     this.fb = fb;
     this._authService = authService;
     this._notificationsService = notificationsService;
     this._userService = userService;
     this.options = { timeOut: 1500, pauseOnHover: true, showProgressBar: true, animate: 'scale', position: ['right', 'bottom'] };
   }

  public ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
  }

}
