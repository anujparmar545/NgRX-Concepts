import { createAction, props } from "@ngrx/store"
import { User } from "src/app/models/user.model";

export const LOGIN_START = '[auth page] login start'
export const LOGIN_SUCCESS = '[auth page] login success'
export const LOGIN_FAIL = '[auth page] login fail'

export const SIGNUP_START = '[auth page] signup start'
export const SIGNUP_SUCCESS = '[auth page] signup success'
export const SIGNUP_FAIL = '[auth page] signup fail'

export const AUTO_LOGIN_ACTION = '[auth page] autoLogin'
export const LOGOUT_ACTION = '[auth page] autoLogout'

export const loginStart = createAction(
  LOGIN_START,
  props<{email: any;password: any}>()
  );
export const loginSuccess = createAction(
  LOGIN_SUCCESS
  ,props<{user: User, redirect: boolean}>()
  );
export const loginFail = createAction(
  LOGIN_FAIL,
  props<{email: any;password: any}>()
  );

export const signupStart = createAction(
  SIGNUP_START,
  props<{email: any;password: any}>()
  );

export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
props<{user : User, redirect: boolean}>()
  );

export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const autoLogout = createAction(LOGOUT_ACTION);
