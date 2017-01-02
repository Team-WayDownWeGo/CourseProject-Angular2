import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from './../../../../node_modules/angular2-notifications';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../common-services/user.service';


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  public username: string;
  public form: FormGroup;
  public options: Object;
  public fb: FormBuilder;

  private _service: CategoryService;
  private _userService: UserService;
  private _notificationsService: NotificationsService;
  private _router: Router;

  constructor(
    service: CategoryService,
    userService: UserService,
    fb: FormBuilder,
    notificationsService: NotificationsService,
    router: Router) {
    this.fb = fb;
    this._service = service;
    this._userService = userService;
    this._notificationsService = notificationsService;
    this._router = router;
    this.username = JSON.parse(localStorage.getItem('user')).result.username;
    this.options = { timeOut: 1500, pauseOnHover: true, showProgressBar: true, animate: 'scale', position: ['right', 'bottom'] };
  }

  ngOnInit() {
    console.log('in init');
    this.form = this.fb.group({
      category: ['', [Validators.required, Validators.maxLength(30)]],
      user: [this.username]
    })
  }

  public onCreateCategory(): void {
    this._service.createCategory(this.form.value)
      .subscribe(response => {
        if (response.message.type === 'error') {
          return this._notificationsService.error('Error', `${response.message.text}`);
        }

        this._notificationsService.success('', 'Category created');
      },
      err => console.log(err));
  }

}
