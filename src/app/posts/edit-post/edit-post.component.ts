import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../postslist/state/posts.actions';
import { getPostById } from '../postslist/state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post !: Post;
  postSubscription !: Subscription;
  postForm !: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store:Store<AppState>) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>{
      const id= params.get('id')
      this.postSubscription = this.store.select(getPostById,{id}).subscribe((data) => {
        this.post =data;
        console.log('pos',this.post);

        this.createForm();
      })
    })
  }
  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title,[
        Validators.required,Validators.minLength(6),
      ]),
      description: new FormControl(this.post.description,[
        Validators.required,Validators.minLength(10),
      ]),
    })
  };

  onUpdateForm(){
    console.log(this.postForm);
    if(!this.postForm.valid)
      return;

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post:Post ={
      id: this.post.id,
      title: title,
      description:description
    };

    this.store.dispatch(updatePost({post}));
    this.router.navigate(['posts'])



  }
  showTitleErrors(){

    const titleForm = this.postForm.get('title')
      if(titleForm?.touched && !titleForm.valid){

        if(titleForm?.errors?.required)
          return 'Title is required';

        if(titleForm?.errors?.minLength)
          return 'Title should be more than 6 characters'
      }
      return ''
  }

  showDescErrors(){
    const descriptionForm = this.postForm.get('description')
      if(descriptionForm?.touched && !descriptionForm.valid){

        if(descriptionForm?.errors?.required)
          return 'Description is required';

        if(descriptionForm?.errors?.minLength)
          return 'Description should be more than 10 characters'

      }
      return ''
  }


  ngOnDestroy(): void {
    if(this.postSubscription)
      this.postSubscription.unsubscribe();
  }
}
