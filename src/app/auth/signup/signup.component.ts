import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadingSpinner } from 'src/app/store/shared/shared.actions';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm !: FormGroup;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

    this.signupForm =  new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }

  onSignup(){
    //console.log(this.signupForm);
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.store.dispatch(loadingSpinner({status:true}))
    this.store.dispatch(signupStart({email,password}))

  }
}
