import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(user_details) {
    return this.http.post(`${environment.apiEndpoint}/login/user`, { user: user_details })
    .pipe(
      catchError(this.handleError('loginUser', []))
    );
  }

  loginCompany(company_details) {
    return this.http.post(`${environment.apiEndpoint}/login/company`, { company: company_details })
    .pipe(
      catchError(this.handleError('loginCompany', []))
    );
  }

  setLocalStorage(token) {
    localStorage.setItem('currentUser', token);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
