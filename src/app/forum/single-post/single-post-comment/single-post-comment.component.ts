import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-post-comment',
  templateUrl: './single-post-comment.component.html',
  styleUrls: ['./single-post-comment.component.css']
})
export class SinglePostCommentComponent implements OnInit {

 @Input() comment = {};
 @Output() like = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onLike() {
    
  }
}
