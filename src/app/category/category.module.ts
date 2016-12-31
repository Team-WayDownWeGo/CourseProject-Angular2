import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { SingleCategoryComponent } from './list-categories/single-category/single-category.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SingleCategoryComponent, ListCategoriesComponent]
})
export class CategoryModule { }
