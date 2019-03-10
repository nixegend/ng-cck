import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { UserRolesTypes } from '../common/user-roles';

import { getCurrentUserRole } from '../auth/ngrx/selectors';
import { IMainReducerState } from '../app.reducers';
import { StartLoadAllUsers } from '../auth/ngrx/actions';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUserRole$: Observable<UserRolesTypes>;

  constructor(private store: Store<IMainReducerState>) { }

  ngOnInit() {
    this.currentUserRole$ = this.store.pipe(select(getCurrentUserRole));
  }

  onLoadAllusers() {
    this.store.dispatch(new StartLoadAllUsers());
  }
}