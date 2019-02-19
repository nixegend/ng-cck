import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserRolesTypes } from '../common/user-roles';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { getCurrentUserRole } from './ngrx/selectors';
import { IMainReducerState } from '../app.reducers';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  currentUserRole: UserRolesTypes | '';

  constructor(
    private router: Router,
    private store: Store<IMainReducerState>
  ) {
    this.store.pipe(select(getCurrentUserRole)).subscribe((role: UserRolesTypes | '') => {
      this.currentUserRole = role;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const roles = route.data.roles;

    if (this.currentUserRole && Array.isArray(roles) && roles.indexOf(this.currentUserRole) !== -1) {
      return true;
    }

    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}