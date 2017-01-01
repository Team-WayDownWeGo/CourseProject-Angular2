import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from './../../../../node_modules/angular2-notifications';
import { Router } from '@angular/router';

import { ForumService } from '../../services/forum.service';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  username: string;
  title: string;
  description: string;
  postForm: FormGroup;
  options: Object;
  category: string
  categories: any;

  constructor(private _service: ForumService,
  private _categoryService: CategoryService,
    private fb: FormBuilder,
    private _notificationService: NotificationsService,
    private _router: Router) {
      this.username = JSON.parse(localStorage.getItem('user')).result.username;
      this.options = { timeOut: 1500, pauseOnHover: true, showProgressBar: true, animate: 'scale', position: ['right', 'bottom'] };
   }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(60)]],
      description: ['', Validators.required],
      category: [''],
       user: [this.username] 
    });

    this._categoryService
      .getAllCategories()
      .subscribe(response => {
                if (response.message === 'error') {
                    this._notificationService.error('Error', `${response.message}`);
                } else {
                  this.categories = response.map(x => {
                    return x.title;
                  });
                }
            },
            err => console.log(err));

  }

  //  onSubmit({ value, valid }: { value: Post, valid: boolean }) {
  //   console.log(value, valid);
  // }

  public onCreatePost(): void {
    console.log('onCreatePost');
    console.log(this.postForm.value);
    console.log('--------');
        this._service
            .createPost(this.postForm.value)
            .subscribe(response => {
                if (response.message.type === 'error') {
                    this._notificationService.error('Error', `${response.message.text}`);
                } else {
                    this._notificationService.success('Success.', `Thread is created.`);
                    console.log(response.id);
                   // setTimeout(() => this._router.navigateByUrl('/forum'), 1500);
                }
            },
            err => console.log(err));
    }

}
