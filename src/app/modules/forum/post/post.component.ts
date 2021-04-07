import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post.interfaces';

/**
 * Post component
 */
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  /**
   * Post data
   */
  @Input() post: IPost;

  constructor() {}

  ngOnInit(): void {}
}
