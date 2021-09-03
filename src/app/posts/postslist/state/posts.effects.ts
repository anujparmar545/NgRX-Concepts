import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { PostsService } from "src/app/services/posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPostStart, loadPostSuccess, updatePost, updatePostSuccess } from "./posts.actions";
import {Post} from '../../../models/posts.model'
@Injectable()
export class PostEffects {

  constructor(private action$: Actions,
              private postService: PostsService) {}

  loadPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPostStart),
      mergeMap(action => {
        return this.postService.getPosts().pipe(
          map((posts) => {
            return loadPostSuccess({posts})

        }))
      })
    )
  })

  addPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addPost),
      mergeMap(action => {
        return this.postService.addPost(action.post).pipe(
          map((name) => {
            console.log('id::',name);
            const post:Post = {...action.post, id: name}
            return addPostSuccess({post})
          }))
      })
    )
  })

  updatePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updatePost),
      switchMap(action => {
        return this.postService.updatePost(action.post).pipe(
          map((name) => {
            console.log('id::',name);
            return updatePostSuccess({post: action.post})
          }))
      })
    )
  })

  deletePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deletePost),
      switchMap(action => {
        return this.postService.deletePost(action.id).pipe(
          map((data) => {
            console.log('id::',data);
            return deletePostSuccess({id:action.id})
          }))
      })
    )
  })








}
