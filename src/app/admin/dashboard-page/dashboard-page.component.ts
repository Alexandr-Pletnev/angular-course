import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../shared/post.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";
import {registerLocaleData} from "@angular/common";
import ruLocal from "@angular/common/locales/ru";

registerLocaleData(ruLocal, 'ru');

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  public searchStr = '';
  public posts: Post[] = [];
  private subGet: Subscription;
  private subDelete: Subscription;

  constructor(
    private postService: PostService,
    private alert: AlertService,
  ) {
  }

  ngOnDestroy(): void {
    if (this.subGet) {
      this.subGet.unsubscribe();
    }

    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subGet = this.postService.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }

  private subscription: Subscription;

  postDelete(id: string) {
    this.subDelete = this.subscription = this.postService.delete(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id != id);
      this.alert.danger('Пост был удален');
    });
  }
}
