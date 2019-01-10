import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models/user';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentUser: User;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
  }
}