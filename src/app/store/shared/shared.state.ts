export interface SharedState {
  showLoading : boolean;
  errorMessage: string
}

export const inititalState: SharedState ={
  showLoading: false,
  errorMessage: '',
}
