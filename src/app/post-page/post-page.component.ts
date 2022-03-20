import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../shared/interfaces";
import {PostService} from "../shared/post.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  public post$: Observable<Post>;

  constructor(
    private postService: PostService,
    private currentRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
      this.post$ =  this.currentRoute.params.pipe(
        switchMap(params => {
          return this.postService.getById(params['id']);
        }),
      );
  }

}
