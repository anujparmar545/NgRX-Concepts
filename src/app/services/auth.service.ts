import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { autoLogout } from '../auth/state/auth.actions';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { User } from '../models/user.model';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  timeOutInterval: any;

  constructor(private http:HttpClient,
              private store: Store<AppState>) { }

  login(email :string, password :string) : Observable<AuthResponseData>{
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`

    return this.http.post<AuthResponseData>(url,{email,password,returnSecureToken:true })
  }

  signup(email :string, password :string) : Observable<AuthResponseData>{
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`

    return this.http.post<AuthResponseData>(url,{email,password,returnSecureToken:true })
  }


  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime()+ +data.expiresIn *1000)
    const user = new User(data.email,data.idToken,data.localId, expirationDate);
    return user;
  }

  getErrorMessage(message:string) {

    switch(message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found'
      case 'INVALID_PASSWORD':
        return 'Invalid Password'
      case 'EMAIL_EXISTS':
        return ' Email already exists'
      default:
        return 'Something went wrong ...Try Again'
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData',JSON.stringify(user));
   // this.runTimeOutinterval(user);
  }
  runTimeOutinterval(user:User) {
    const todayDate = new Date().getTime()
    const expirationDate = user.expireDate.getTime()
    const timeInterval = expirationDate -  todayDate

    this.timeOutInterval =  setTimeout(() => {
      //auto logout code
      this.store.dispatch(autoLogout())
    }, timeInterval);
  }

  getuserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    let  userData;
    if(userDataString)
      userData =  JSON.parse(userDataString);

    //let expirationDate  =  new Date(userData.expirationDate)
    const user = new User(userData.email,userData.token,userData.localId,userData.expirationDate)
    //this.runTimeOutinterval(user)

    return user;
  }

  logout() {
    localStorage.removeItem('userData');
    if(this.timeOutInterval) {
      clearTimeout(this.timeOutInterval)
      this.timeOutInterval= null;
    }
  }
}
