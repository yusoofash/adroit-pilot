import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { UserType, Company } from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDetails = null;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService) { }

  updateDetails(detail) {
    const {role, id} = this.role_and_type();
    console.log(id);
    return this.http.put(`${environment.apiEndpoint}/${role}/${id}`, detail)
      .pipe(
        catchError(this.handleError('updateDetails', [])),
        map(res => {
          this.userDetails = new Company(res);
          return this.userDetails;
        })
      );
  }

  getDetails() {
    const {role, id} = this.role_and_type();
    return this.http.get(`${environment.apiEndpoint}/${role}/${id}`)
      .pipe(
        catchError(this.handleError('getDetails', [])),
        map(res => {
          this.userDetails = new Company(res);
          return this.userDetails;
        })
      );
  }

  private role_and_type() {
    const decodedToken = this.authService.getDecodedAccessToken();
    if (decodedToken) {
      const role = decodedToken.roles;
      const id = decodedToken.sub;
      return {role, id};
    }
    return null;
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
