import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { map } from 'rxjs/operators';

interface AuthResponse {
  status: string;
  success: string;
  token: string;
}

interface JWTResponse {
  status: string;
  success: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'JWT';
  isAuthenticated = false;
  username = new Subject<string>();
  authToken: string;
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  checkJWTtoken() {
    this.http.get<JWTResponse>(this.apiUrl + '/users/checkJWTtoken')
    .subscribe(res => {
      this.sendUsername(res.user.username);
    },
    err => {
      this.destroyUserCredentials();
    });
  }

  sendUsername(name: string) {
    this.username.next(name);
  }

  clearUsername() {
    this.username.next(undefined);
  }

  loadUserCredentials() {
    const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    if (credentials && credentials.username !== undefined) {
      this.useCredentials(credentials);
      if (this.authToken) {
        this.checkJWTtoken();
      }
    }
  }

  storeUserCredentials(credentials: any) {
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
  }

  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }

  logIn(user: any): Observable<any> {
    return this.http.post<AuthResponse>(this.apiUrl + '/users/login', user).pipe(map(res => {
      if (res.success) {
        this.storeUserCredentials({username: user.username, token: res.token});
        return {success: res.success, username: user.username, status: res.status};
      } else {
        return {success: res.success, username: user.username, status: res.status };
      }
    }));
  }

  logOut() {
    this.destroyUserCredentials();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }

  getToken(): string {
    return this.authToken;
  }

}
