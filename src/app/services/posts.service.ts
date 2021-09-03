import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../models/posts.model';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient,
              private store: Store<AppState>) { }

  getPosts() : Observable<Post[]>{
    const url = `${environment.FIREBASE_DB_URL}/posts.json`;

    return this.http.get<Post[]>(url).pipe(
      map((data) =>{
        const posts: Post[] =[];
        for(let key in data){
            posts.push({...data[key], id: key})
        }
          return posts;
        }
      )
    );
    }

    addPost(post:Post) : Observable<string>{
      const url = `${environment.FIREBASE_DB_URL}/posts.json`;

      return this.http.post<string>(url,post).pipe(
        map(data => {return data;})
      );
      }

    updatePost(post:any) : Observable<string>{

      const postdata = {
        [post.id] : {title:post.title, description: post.description}
      }
      const url = `${environment.FIREBASE_DB_URL}/posts.json`;
      return this.http.patch<string>(url,postdata).pipe(
        map(data => {return data;})
      );

    }

    deletePost(id:any) {
      const url = `${environment.FIREBASE_DB_URL}/posts/id=${id}.json`;
      return this.http.delete(url);
    }
}
