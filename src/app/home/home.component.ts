import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user';
import { UserService } from '../auth/user.service';
import { AuthService } from '../auth/auth.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  currentUser: User;
  userFromApi: User;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
      this.userFromApi = user;
    });
  }
}