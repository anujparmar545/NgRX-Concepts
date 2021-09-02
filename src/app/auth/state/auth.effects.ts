import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from "src/app/services/auth.service";
import { loadingSpinner, setErrorMessage } from "src/app/store/shared/shared.actions";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { of } from "rxjs";
import { Router } from "@angular/router";
@Injectable()
export class AuthEffects {

  constructor(private action$:Actions,
              private authService: AuthService,
              private store: Store<AppState>,
              private router:Router){}

  login$ = createEffect(():any =>{
    return this.action$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email,action.password).pipe(
          map(data =>{
            this.store.dispatch(loadingSpinner({status:false}))
            const user = this.authService.formatUser(data)
            return loginSuccess({user})
          }),
          catchError((err) => {
            const errorMsg = this.authService.getErrorMessage(err.error.error.message)
            this.store.dispatch(loadingSpinner({status:false}))
            return of(setErrorMessage({message:errorMsg}))
          })
        )
      })
    )
  })

  redirectToHome$ = createEffect(() => {
    return this.action$.pipe(
      ofType(...[loginSuccess,signupSuccess]),
      tap((action) =>{
        this.store.dispatch(setErrorMessage({message: ''}))
        this.router.navigate(['/'])
      })
    )
  },{dispatch:false})


  signUp$ =  createEffect(() => {
    return this.action$.pipe(
      ofType(signupStart),
      exhaustMap((action) =>
        this.authService.signup(action.email,action.password).pipe(
          map((data) =>{
            this.store.dispatch(loadingSpinner({status:false}))
            const user = this.authService.formatUser(data);
            return signupSuccess({user})
          }),
          catchError((err) => {
            const errorMsg = this.authService.getErrorMessage(err.error.error.message)
            this.store.dispatch(loadingSpinner({status:false}))
            return of(setErrorMessage({message:errorMsg}))
          })
        )
      )

    )
  })
}
