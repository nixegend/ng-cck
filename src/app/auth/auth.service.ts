import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISignUpUserInfo } from '../common/models';

// import { map } from 'rxjs/operators';

import { ApiRouts } from '../common/api';
import { ICurrentUser, ISignInUserInfo } from '../common/models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public currentUser: Observable<ICurrentUser>;
  constructor(private http: HttpClient) { }

  getTestData() {
    return this.http.get(`/api/test`);
  }

  signUpUser(userInfo: ISignUpUserInfo): Observable<any> {
    return this.http.post<any>(ApiRouts.SIGNUP_USER, userInfo, httpOptions);
  }

  signInUser(credentials: ISignInUserInfo): Observable<ICurrentUser> {
    return this.http.post<ICurrentUser>(ApiRouts.SIGNIN_USER, credentials, httpOptions);
  }

  getCurrentUser(): Observable<ICurrentUser> {
    return this.http.get<ICurrentUser>(ApiRouts.CURRENT_USER);
  }

  // login(username: string, password: string) {
  //   return this.http.post<any>(`/api/auth/login`, { username, password })
  //     .pipe(map(user => {
  //       if (user && user.token) {
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //       }
  //       return user;
  //     }));
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
