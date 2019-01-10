import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { Role } from './models/role';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}