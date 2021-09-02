import { createReducer, on } from "@ngrx/store";
import { loginSuccess, signupSuccess } from "./auth.actions";
import { inititalState } from "./auth.state";

export const _authReducer = createReducer(
  inititalState,
  on(loginSuccess, (state,action) => {
    console.log(action);

    return {
      ...state,
      user: action.user
    }
  }),
  on(signupSuccess, (state,action) => {
    return {
      ...state,
      user: action.user
    }
  }),

  );

export function AuthReducer(state:any,action:any) {
  return _authReducer(state,action);
}
