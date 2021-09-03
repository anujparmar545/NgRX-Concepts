import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
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
            this.authService.setUserInLocalStorage(user)
            return loginSuccess({user,redirect:true})
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
        if(action.redirect)
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
            this.authService.setUserInLocalStorage(user)
            return signupSuccess({user, redirect: true})
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

  autoLogin$ = createEffect(() => {
    return this.action$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user= this.authService.getuserFromLocalStorage();
        console.log('autoLogin',user);
          return of(loginSuccess({user,redirect: false}));

      })
    )
  })

  logout$ = createEffect(() => {
    return this.action$.pipe(
      ofType(autoLogout),
      map((action) => {
        this.authService.logout();
        this.router.navigate(['auth'])

      })
    )
  },{dispatch:false})
}
