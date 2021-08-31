import { CounterState } from "../counter/state/counter.state";
import { PostState } from "../posts/postslist/state/posts.state";
import { counterReducer } from "../counter/state/counter.reducer";
import { postReducer } from "../posts/postslist/state/posts.reducer";

export interface AppState {
  counter: CounterState,
  posts: PostState
}

export const appReducer = {
  counter: counterReducer,
  posts: postReducer
}
