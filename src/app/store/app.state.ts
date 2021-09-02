import { CounterState } from "../counter/state/counter.state";
import { PostState } from "../posts/postslist/state/posts.state";
import { counterReducer } from "../counter/state/counter.reducer";
import { postReducer } from "../posts/postslist/state/posts.reducer";
import { SharedState } from './shared/shared.state'
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedReducer } from "./shared/shared.reducer";
import { AuthState } from "../auth/state/auth.state";
import { AUTH_STATE_NAME } from "../auth/state/auth.selector";
import { AuthReducer } from "../auth/state/auth.reducer";
export interface AppState {
  [SHARED_STATE_NAME] : SharedState;
  [AUTH_STATE_NAME]: AuthState
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer
}
