import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISignUpUserInfo } from '../common/models';

import { ApiRouts } from '../common/api';
import { ICurrentUser, ISignInUserInfo } from '../common/models';

const TOKEN_KEY = 'AuthToken';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  public signUpUser(userInfo: ISignUpUserInfo): Observable<any> {
    return this.http.post<any>(ApiRouts.SIGNUP_USER, userInfo, httpOptions);
  }

  public signInUser(credentials: ISignInUserInfo): Observable<ICurrentUser> {
    return this.http.post<ICurrentUser>(ApiRouts.SIGNIN_USER, credentials, httpOptions);
  }

  public getAllUsers(): Observable<ICurrentUser[]> {
    return this.http.get<ICurrentUser[]>(ApiRouts.ALL_USERS);
  }

  public getCurrentUser(): Observable<ICurrentUser> {
    return this.http.get<ICurrentUser>(ApiRouts.CURRENT_USER);
  }

  public clearSessionStorage() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  //     .pipe(map(user => {
  //       if (user && user.token) {
  //         localStorage.setItem('currentUser', JSON.stringify(user));
}
