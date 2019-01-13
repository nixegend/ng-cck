import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Increment, Decrement, Reset } from './ngrx/actions';
import { Router } from '@angular/router';

import { Role } from '../models/role';
import { User } from '../models/user';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  count$: Observable<number>;

  currentUser: User;
  // private roles: string[];
  private authority: string;

  constructor(
    private store: Store<{ count: number }>,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {
    this.count$ = store.pipe(select('count'));
    // this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  increment() {
    this.store.dispatch(new Increment());
  }

  decrement() {
    this.store.dispatch(new Decrement());
  }

  reset() {
    this.store.dispatch(new Reset());
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.tokenStorage.clearSessionStorage();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    console.log(this.tokenStorage.getToken());

    if (this.tokenStorage.getToken()) {
      // this.roles = this.tokenStorage.getAuthorities();
      // this.roles.every(role => {
      //   if (role === 'ROLE_ADMIN') {
      //     this.authority = 'admin';
      //     return false;
      //   } else if (role === 'ROLE_PM') {
      //     this.authority = 'pm';
      //     return false;
      //   }
      //   this.authority = 'user';
      //   return true;
      // });
    }
  }
}