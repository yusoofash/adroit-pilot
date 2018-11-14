import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { UserType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedin = new BehaviorSubject<boolean>(false);
  public _isLoggedin$ = this.isLoggedin.asObservable();

  constructor(private http: HttpClient) {
    const user = this.getToken();

    if (user === null) {
      this.isLoggedin.next(false);
    } else {
      this.isLoggedin.next(true);
    }
  }

  loginUser(email: string, password: string) {
    return this.http.post<any>(`${environment.apiEndpoint}/user/authenticate`, { email, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('access_token', JSON.stringify(user.access_token));
          this.isLoggedin.next(true);
        }

        return user;
      }));
  }

  loginCompany(email: string, password: string) {
    return this.http.post<any>(`${environment.apiEndpoint}/company/authenticate`, { email, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('access_token', JSON.stringify(user.access_token));
          this.isLoggedin.next(true);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
    console.log('logged out');
    this.isLoggedin.next(false);
  }

  getToken() {
    const jwtToken = localStorage.getItem('access_token');
    return jwtToken ? jwtToken : null;
  }

  getDecodedAccessToken() {
    const token = localStorage.getItem('access_token');
    try {
        return jwt_decode(token);
    } catch (Error) {
        return null;
    }
  }

  currentUser() {
    const decodedToken = this.getDecodedAccessToken();
    if (decodedToken) {
      const role = decodedToken.roles;
      return role === UserType.COMPANY ? role : (role === UserType.USER) ? role : null;
    }
    return null;
  }
}
