import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ICurrentUser } from '../common/models';
import { IMainReducerState } from '../app.reducers';
import { getAllUsersFromState } from './selectors';
import { StartLoadAllUsers } from '../auth/ngrx/actions';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
  users$: Observable<ICurrentUser[]>;

  constructor(private store: Store<IMainReducerState>) { }

  ngOnInit() {
    this.store.dispatch(new StartLoadAllUsers());
    this.users$ = this.store.pipe(select(getAllUsersFromState));
  }
}