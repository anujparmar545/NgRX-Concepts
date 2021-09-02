import { createReducer, on } from "@ngrx/store";
import { loadingSpinner, setErrorMessage } from "./shared.actions";
import { inititalState } from "./shared.state";

export const _sharedReducer = createReducer(
  inititalState,
  on(loadingSpinner, (state,action) => {

    return {
      ...state,
      showLoading:action.status
    }
  }),
  on(setErrorMessage, (state,action) => {

    return {
      ...state,
      errorMessage:action.message
    }
  })

  );

export function SharedReducer(state:any,action:any) {
  return _sharedReducer(state,action);
}
