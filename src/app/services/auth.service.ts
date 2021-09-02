import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

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
}
