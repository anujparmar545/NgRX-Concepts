import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { deletePost, loadPostStart } from './state/posts.actions';
import { getPosts } from './state/posts.selector';

@Component({
  selector: 'app-postslist',
  templateUrl: './postslist.component.html',
  styleUrls: ['./postslist.component.css']
})
export class PostslistComponent implements OnInit {
  posts !: Observable<Post[]>
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPostStart());
  }

  onDelete(id:any) {
    if(confirm("Are you sure...fir mat bolna bataya nai"))
    {  console.log('id',id);
       this.store.dispatch(deletePost({id}))
    }
  }
}
