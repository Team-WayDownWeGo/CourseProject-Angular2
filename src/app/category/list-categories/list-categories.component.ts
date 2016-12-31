import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  private categories: any;
  constructor(private _categoryService: CategoryService) { }

  ngOnInit() {
    this._categoryService
      .getAllCategories()
         .subscribe(response => {
                if (response.message === 'error') {
                    // this._notificationService.error('Error', `${response.message.text}`);
                } else {
                    this.categories = response;
                }
            },
            err => console.log(err));
  }

//   ngAfterViewInit() {
// var divs = document.getElementsByClassName('col-md-4');
// var body = document.getElementsByTagName('body')[0];
// var dv;
// for(var i = 0; i < divs.length; i += 1)
// {
//   console.log('---------');
//     if ((i % 3) === 0) {
//      dv = document.createElement('div');
//       dv.setAttribute('class', 'row');
//       divs[i].parentNode.insertBefore(dv, divs[i]);
//     }

//     dv.appendChild(divs[i]);
// }
//   }
}
