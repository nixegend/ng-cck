import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ICurrentUser } from '../../common/models';
import { IMainReducerState } from '../../app.reducers';
import { getAllUsersFromState } from './selectors';
import { StartLoadAllUsers } from '../../auth/ngrx/actions';

@Component({
  selector: 'app-product-type-manager',
  templateUrl: './product-type-manager.component.html',
  styleUrls: ['./product-type-manager.component.css']
})
export class ProductTypeManagerComponent implements OnInit {
  users$: Observable<ICurrentUser[]>;

  constructor(private store: Store<IMainReducerState>) { }

  ngOnInit() {
    this.store.dispatch(new StartLoadAllUsers());
    this.users$ = this.store.pipe(select(getAllUsersFromState));
  }
}