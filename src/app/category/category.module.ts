import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsModule, NotificationsService } from '../../../node_modules/angular2-notifications';

import { UserService } from './../common-services/user.service';
import { CategoryService } from './../services/category.service';

import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { SingleCategoryComponent } from './list-categories/single-category/single-category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';

@NgModule({
  imports: [
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule,
    CommonModule
  ],
  declarations: [SingleCategoryComponent, ListCategoriesComponent, CreateCategoryComponent],
  providers: [UserService, CategoryService, NotificationsService]
})
export class CategoryModule { }
