import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {

  @Input() category: any;

  constructor() { }

  ngOnInit() {
  }

}

