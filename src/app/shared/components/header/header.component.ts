import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogout } from 'src/app/auth/state/auth.actions';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated !:  Observable<boolean>;

  constructor(private store : Store) { }

  ngOnInit(): void {

    this.isAuthenticated = this.store.select(isAuthenticated);
    //console.log(this.isAuthenticated);

  }

  onLogout(event :Event){
    event.preventDefault();
    console.log('logout');
    this.store.dispatch(autoLogout())
  }

}
