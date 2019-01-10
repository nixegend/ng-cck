import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { AuthService } from '../auth/auth.service';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
  users: User[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getTestData().subscribe(resp => {
      console.log('getTestData', resp);
    });
  }
}