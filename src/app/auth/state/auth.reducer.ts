import { createReducer, on } from "@ngrx/store";
import {  autoLogout, loginSuccess, signupSuccess } from "./auth.actions";
import { inititalState } from "./auth.state";

export const _authReducer = createReducer(
  inititalState,
  on(loginSuccess, (state,action) => {
    //console.log(action);
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
  on(autoLogout, (state) => {
    return {
      ...state,
      user: null
    }
  }),

  );

export function AuthReducer(state:any,action:any) {
  return _authReducer(state,action);
}
