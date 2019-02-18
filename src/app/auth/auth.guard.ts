import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    // private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUserRole = JSON.parse(sessionStorage.getItem('currentUser'));
    const roles = route.data.roles;

    if (currentUserRole && Array.isArray(roles) && roles.indexOf(currentUserRole) !== -1) {
      return true;
    }

    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}