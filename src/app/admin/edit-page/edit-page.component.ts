import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../shared/post.service";
import {Subscription, switchMap} from "rxjs";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public isSubmitting = false;

  private post: Post;
  private updateSub$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
      return this.postService.getById(params['id']);
    })).subscribe((post: Post) => {
      this.post = post;
       this.form = new FormGroup({
         title: new FormControl(post.title, Validators.required),
         text: new FormControl(post.text, Validators.required),
       })
    });
  }

  submit() {
    if(this.form.invalid){
      return;
    }

    this.isSubmitting = true;

    const post: Post = {
      ...this.post,
      title: this.form.value.title,
      text: this.form.value.text,
    }

    this.updateSub$ = this.postService.update(post).subscribe((post: Post) => {
      this.isSubmitting = false;
      this.alert.warning('Пост был обновлен');
    });
  }

  ngOnDestroy(): void {
    if(this.updateSub$){
      this.updateSub$.unsubscribe();
    }
  }
}
