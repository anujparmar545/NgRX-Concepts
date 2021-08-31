import { state } from "@angular/animations";
import { createFeatureSelector, createSelector, props } from "@ngrx/store";
import { PostState } from "./posts.state";

export const POST_STATE_NAME ='posts'
const getPostState = createFeatureSelector<PostState>(POST_STATE_NAME)

export const getPosts = createSelector(getPostState, state =>{
  return state.posts
})

export const getPostById = createSelector(getPostState,(state: any,props: any) => {
  return state.posts.find((p: { id: any; }) => p.id == props.id)
})
