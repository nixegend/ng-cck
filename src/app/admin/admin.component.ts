import { Component, OnInit } from '@angular/core';

import { ICurrentUser } from '../common/models';
import { AuthService } from '../auth/auth.service';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
  users: ICurrentUser[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() { }
}