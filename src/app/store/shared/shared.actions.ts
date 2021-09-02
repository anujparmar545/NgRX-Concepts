import { createAction, props } from "@ngrx/store"

export const LOADER_ACTION = '[shared state] loading spinner'
export const SET_ERROR_MESSAGE = '[shared state] set error message'

export const loadingSpinner = createAction(
  LOADER_ACTION,
  props<{status: boolean}>())

  export const setErrorMessage = createAction(
    SET_ERROR_MESSAGE,
    props<{message: string}>())
