import { createReducer, on } from "@ngrx/store";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPostSuccess, updatePost, updatePostSuccess } from "./posts.actions";
import { initialState } from "./posts.state";

const _postReducer = createReducer(initialState,
  on(addPostSuccess, (state,action) => {
    let post ={...action.post}

    return {
      ...state,
      posts:[...state.posts,post]
    }
  }),
  on(updatePostSuccess, (state,action) => {
    const updatedPost = state.posts.map((post:any) =>{
      return action.post.id === post.id ? action.post: post;
    });
     return {
      ...state,
      posts: updatedPost,
    }
  }),
  on(deletePostSuccess,(state,action) =>{
    const updatedPost = state.posts.filter((post: any) => post.id !=action.id);

    return {
      ...state,
      posts: updatedPost
    }
  }),
  on(loadPostSuccess,(state, action) =>{
    return{
      ...state,
      posts: action.posts
    }
  })
);

export function postReducer(state:any,action: any) {
  return _postReducer(state,action);
}
