import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";
import { addPost, deletePost, updatePost } from "./posts.actions";
import { initialState } from "./posts.state";

const _postReducer = createReducer(initialState,
  on(addPost, (state,action) => {
    let post ={...action.post}
    post.id = (state.posts.length+1)

    return {
      ...state,
      posts:[...state.posts,post]
    }
  }),
  on(updatePost, (state,action ) => {
    const updatedPost = state.posts.map((post:any) =>{
      return action.post.id === post.id ? action.post: post;
    });

     return {
      ...state,
      posts: updatedPost,
    }
  }),
  on(deletePost,(state,action) =>{
    const updatedPost = state.posts.filter((post: any) => post.id !=action.id);

    return {
      ...state,
      posts: updatedPost
    }
  })
);

export function postReducer(state:any,action: any) {
  return _postReducer(state,action);
}
