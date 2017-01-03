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
    this.options = { timeOut: 1500, pauseOnHover: true, showProgressBar: true, animate: 'scale', position: ['right', 'bottom'] };
  }

  ngOnInit() {
    this.form = this.fb.group({
      categoryName: ['', [Validators.required, Validators.maxLength(30)]],
      categoryDescription: ['', [Validators.maxLength(200)]],
    })
  }

  public onCreateCategory(): void {
    this._service.createCategory(this.form.value)
      .subscribe(response => {
        // if (response.message.type === 'error') {
        //   return this._notificationsService.error('Error', `Something happened`);
        // }

        this._notificationsService.success('', 'Category created');
        setTimeout(() => this._router.navigateByUrl('/category'), 1500);
      },
      err => console.log(err));
  }

}
