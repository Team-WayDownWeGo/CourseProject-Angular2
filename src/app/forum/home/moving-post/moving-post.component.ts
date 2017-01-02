import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-moving-post',
  templateUrl: './moving-post.component.html',
  styleUrls: ['./moving-post.component.css']
})
export class MovingPostComponent implements OnInit {
  @Input() post;
  constructor() { }

  ngOnInit() {
  }

}
