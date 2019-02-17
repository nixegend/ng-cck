import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { ISignUpUserInfo } from '../common/models';

import { map } from 'rxjs/operators';

import { ApiRouts } from '../common/api';
import { ICurrentUser } from '../common/models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/api/auth/signin';
  private signupUrl = '/api/auth/signup';

  public currentUser: Observable<ICurrentUser>;

  constructor(
    private http: HttpClient,
  ) { }

  getTestData() {
    return this.http.get(`/api/test`);
  }

  signUpUser(userInfo: ISignUpUserInfo): Observable<any> {
    return this.http.post<any>(ApiRouts.SIGNUP_USER, userInfo, httpOptions);
  }

  getCurrentUser(): Observable<ICurrentUser> {
    return this.http.get<ICurrentUser>(ApiRouts.CURRENT_USER);
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  // signUp(info: SignUpInfo): Observable<string> {
  //   return this.http.post<string>(this.signupUrl, info, httpOptions);
  // }

  login(username: string, password: string) {
    return this.http.post<any>(`/api/auth/login`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
